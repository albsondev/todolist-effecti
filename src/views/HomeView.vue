<template>
  <v-container fluid>
    <v-row>
      <v-col class="flex" cols="12" md="4">
        <v-text-field
          v-if="!showForm"
          v-model="searchQuery"
          label="Search Tasks"
          class="mb-4 filter mr-2"
          append-icon="mdi-magnify"
          @click:append="resetSearch"
        ></v-text-field>
        <v-btn
          v-if="!showForm"
          @click="resetCurrentTask"
          color="primary"
          class="mt-2"
        >
          New Task
        </v-btn>
        <task-form
          v-if="showForm"
          @save-task="handleSaveTask"
          @cancel="cancelEdit"
          @form-submitted="handleFormSubmitted"
          :task="currentTask"
        />
      </v-col>
      <v-col cols="12" md="8">
        <transition name="fade">
          <calendar-view
            v-if="showCalendar"
            :tracked="filteredTracked"
            @handleDayClick="handleDayClick"
          />
        </transition>
        <transition name="fade">
          <kanban-view
            v-if="!showCalendar"
            :tasks="filteredTasks"
            @edit-task="editTask"
            @delete-task="deleteTask"
            @toggle-task-status="toggleTaskStatus"
          />
        </transition>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="3000" top right color="success">
      {{ snackbarMessage }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import TaskForm from "../components/TaskForm.vue";
import CalendarView from "../components/CalendarView.vue";
import KanbanView from "../components/KanbanView.vue";

export default {
  components: { TaskForm, CalendarView, KanbanView },
  data() {
    return {
      searchQuery: "",
      currentTask: this.createEmptyTask(),
      showForm: false,
      showCalendar: false,
      selectedTasks: [],
    };
  },
  computed: {
    filteredTasks() {
      return this.$store.getters.allTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          task.priority.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredTracked() {
      const tasksByDate = {};
      this.filteredTasks.forEach((task) => {
        if (!tasksByDate[task.date]) {
          tasksByDate[task.date] = [];
        }
        tasksByDate[task.date].push(task);
      });
      return tasksByDate;
    },
  },
  methods: {
    handleSaveTask(task) {
      if (this.currentTask.id) {
        this.$store.dispatch("updateTask", task);
        this.showSnackbar("Task updated successfully!");
      } else {
        this.$store.dispatch("addTask", task);
        this.showSnackbar("Task added successfully!");
      }
      this.resetCurrentTask();
    },
    editTask(task) {
      this.currentTask = { ...task };
      this.showForm = true;
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
      this.showSnackbar("Task removed successfully!");
    },
    resetCurrentTask() {
      this.currentTask = this.createEmptyTask();
      this.showForm = true;
    },
    updateTasks(tasks) {
      this.$store.commit("updateTasks", tasks);
    },
    toggleTaskStatus(task) {
      this.$store.dispatch("toggleTaskStatus", task);
    },
    createEmptyTask() {
      return {
        title: "",
        description: "",
        priority: "low",
        completed: false,
        date: new Date().toISOString().substr(0, 10),
      };
    },
    handleDayClick({ date }) {
      const tasks = this.filteredTracked[date];
      if (tasks && tasks.length > 0) {
        if (tasks.length === 1) {
          this.editTask(tasks[0]);
        } else {
          this.selectedTasks = tasks;
          this.showCalendar = false;
        }
      }
    },
    resetSearch() {
      this.searchQuery = "";
    },
    cancelEdit() {
      this.showForm = false;
    },
    handleFormSubmitted() {
      this.scrollToTop();
      this.showForm = false;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    },
  },
  created() {
    this.$root.$on("toggle-calendar", (show) => {
      this.showCalendar = show;
    });
  },
};
</script>
