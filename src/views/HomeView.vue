<template>
  <v-container>
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
        <v-sheet height="500">
          <v-calendar
            :now="today"
            :value="today"
            color="primary"
            @click:day="handleDayClick"
          >
            <template v-slot:day="{ date }">
              <v-row class="fill-height">
                <template v-if="tracked[date]">
                  <v-sheet
                    v-for="(task, i) in tracked[date]"
                    :key="i"
                    :title="task.title"
                    :color="getTaskColor(task.priority)"
                    :width="`${getTaskPercentage(date, task.priority)}%`"
                    height="100%"
                    tile
                  ></v-sheet>
                </template>
              </v-row>
            </template>
          </v-calendar>
        </v-sheet>
        <v-row v-if="showList">
          <v-col v-for="task in selectedTasks" :key="task.id" cols="12" md="6">
            <v-card>
              <v-card-title>{{ task.title }}</v-card-title>
              <v-card-subtitle>{{ task.description }}</v-card-subtitle>
              <v-card-actions>
                <v-btn icon @click="editTask(task)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteTask(task.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TaskForm from "../components/TaskForm.vue";

export default {
  components: { TaskForm },
  data() {
    return {
      searchQuery: "",
      currentTask: this.createEmptyTask(),
      today: new Date().toISOString().substr(0, 10),
      showForm: false,
      showList: false,
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
    getTaskColor(priority) {
      switch (priority) {
        case "low":
          return "#90e0ef";
        case "medium":
          return "#0077b6";
        case "high":
          return "#03045e";
        default:
          return "grey";
      }
    },
    getTaskPercentage(date, priority) {
      const tasks = this.tracked[date];
      const count = tasks.filter((task) => task.priority === priority).length;
      return (count / tasks.length) * 100;
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
