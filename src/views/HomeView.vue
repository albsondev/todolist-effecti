<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <task-form
          v-if="showForm"
          @save-task="handleSaveTask"
          :task="currentTask"
        />
        <v-btn
          v-if="!showForm"
          @click="resetCurrentTask"
          color="primary"
          class="mt-2"
        >
          Add New Task
        </v-btn>
        <v-text-field
          v-model="searchQuery"
          label="Search Tasks"
          class="mb-4"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="8">
        <calendar-view
          v-if="showCalendar"
          :tracked="tracked"
          @handleDayClick="handleDayClick"
        />
        <kanban-view
          v-if="!showCalendar"
          :tasks="$store.getters.allTasks"
          @edit-task="editTask"
          @delete-task="deleteTask"
        />
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
      showList: true,
      showCalendar: false,
      selectedTasks: [],
    };
  },
  computed: {
    tracked() {
      const tasksByDate = {};
      this.$store.getters.allTasks.forEach((task) => {
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
      this.showList = false;
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
    resetCurrentTask() {
      this.currentTask = this.createEmptyTask();
      this.showForm = true;
      this.showList = false;
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
      const tasks = this.tracked[date];
      if (tasks && tasks.length > 0) {
        if (tasks.length === 1) {
          this.editTask(tasks[0]);
        } else {
          this.selectedTasks = tasks;
          this.showList = true;
          this.showForm = false;
        }
      }
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
.mt-2 {
  margin-top: 8px;
}
</style>
