<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <task-form @save-task="handleSaveTask" :task="currentTask" />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="searchQuery"
          label="Search Tasks"
          class="mb-4"
        ></v-text-field>
        <v-btn @click="simulateLargeDataSet" color="secondary" class="mb-4">
          Simulate Large Data Set
        </v-btn>
        <task-list
          :tasks="filteredTasks"
          @edit-task="editTask"
          @delete-task="deleteTask"
          @toggle-status="toggleTaskStatus"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";

export default {
  components: { TaskForm, TaskList },
  data() {
    return {
      searchQuery: "",
      currentTask: this.createEmptyTask(),
    };
  },
  computed: {
    filteredTasks() {
      return this.$store.getters.allTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          task.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
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
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
    toggleTaskStatus(id) {
      this.$store.dispatch("toggleTaskStatus", id);
    },
    simulateLargeDataSet() {
      this.$store.dispatch("simulateLargeDataSet");
    },
    resetCurrentTask() {
      this.currentTask = this.createEmptyTask();
    },
    createEmptyTask() {
      return {
        title: "",
        description: "",
        priority: "low",
        completed: false,
      };
    },
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
