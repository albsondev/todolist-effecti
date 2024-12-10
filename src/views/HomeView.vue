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
          />
        </transition>
      </v-col>
    </v-row>
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
      showCalendar: true,
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
      } else {
        this.$store.dispatch("addTask", task);
      }
      this.resetCurrentTask();
    },
    editTask(task) {
      this.currentTask = { ...task };
      this.showForm = true;
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
    resetCurrentTask() {
      this.currentTask = this.createEmptyTask();
      this.showForm = true;
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
  },
  created() {
    this.$root.$on("toggle-calendar", (show) => {
      this.showCalendar = show;
    });
  },
};
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.mt-2 {
  margin-top: 8px;
}
.mr-2 {
  margin-right: 2em !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
