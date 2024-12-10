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
        <calendar-view
          v-if="showCalendar"
          :tracked="tracked"
          @handleDayClick="handleDayClick"
        />
        <v-row v-if="!showCalendar">
          <v-col cols="12" md="4">
            <h3>Baixa</h3>
            <v-card
              v-for="task in lowPriorityTasks"
              :key="task.id"
              class="mb-2"
            >
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
          <v-col cols="12" md="4">
            <h3>Média</h3>
            <v-card
              v-for="task in mediumPriorityTasks"
              :key="task.id"
              class="mb-2"
            >
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
          <v-col cols="12" md="4">
            <h3>Alta</h3>
            <v-card
              v-for="task in highPriorityTasks"
              :key="task.id"
              class="mb-2"
            >
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
import CalendarView from "../components/CalendarView.vue";

export default {
  components: { TaskForm, CalendarView },
  data() {
    return {
      searchQuery: "",
      currentTask: this.createEmptyTask(),
      showForm: false,
      showList: false,
      showCalendar: true,
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
    lowPriorityTasks() {
      return this.$store.getters.allTasks.filter(
        (task) => task.priority === "low"
      );
    },
    mediumPriorityTasks() {
      return this.$store.getters.allTasks.filter(
        (task) => task.priority === "medium"
      );
    },
    highPriorityTasks() {
      return this.$store.getters.allTasks.filter(
        (task) => task.priority === "high"
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
