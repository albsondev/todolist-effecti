<template>
  <v-row class="bg-light pd row-kanban">
    <template v-if="tasks.length > 0">
      <v-col cols="12" md="3" class="border-r">
        <h3 class="col-low border-b text-center">Low</h3>
        <v-card v-for="task in lowPriorityTasks" :key="task.id" class="mb-2">
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-subtitle>{{ task.description }}</v-card-subtitle>
          <v-card-actions>
            <v-btn icon @click="$emit('edit-task', task)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('delete-task', task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              color="#9e9e9e"
              dark
              elevation="2"
              x-small
              @click="$emit('toggle-task-status', task)"
            >
              {{ task.completed ? "Completed" : "Complete" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" class="border-r">
        <h3 class="col-medium border-b text-center">Medium</h3>
        <v-card v-for="task in mediumPriorityTasks" :key="task.id" class="mb-2">
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-subtitle>{{ task.description }}</v-card-subtitle>
          <v-card-actions>
            <v-btn icon @click="$emit('edit-task', task)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('delete-task', task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              color="#9e9e9e"
              dark
              elevation="2"
              x-small
              @click="$emit('toggle-task-status', task)"
            >
              {{ task.completed ? "Completed" : "Complete" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" class="border-r">
        <h3 class="col-high border-b text-center">High</h3>
        <v-card v-for="task in highPriorityTasks" :key="task.id" class="mb-2">
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-subtitle>{{ task.description }}</v-card-subtitle>
          <v-card-actions>
            <v-btn icon @click="$emit('edit-task', task)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('delete-task', task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              color="#9e9e9e"
              dark
              elevation="2"
              x-small
              @click="$emit('toggle-task-status', task)"
            >
              {{ task.completed ? "Completed" : "Complete" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <h3 class="col-completed border-b text-center">Completed</h3>
        <v-card v-for="task in completedTasks" :key="task.id" class="mb-2">
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-subtitle>{{ task.description }}</v-card-subtitle>
          <v-card-actions>
            <v-btn icon @click="$emit('edit-task', task)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('delete-task', task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('toggle-task-status', task)">
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
    <v-col v-else class="empty-state">
      <v-alert type="info">No tasks registered yet.</v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["tasks"],
  computed: {
    lowPriorityTasks() {
      return this.tasks.filter(
        (task) => task.priority === "low" && !task.completed
      );
    },
    mediumPriorityTasks() {
      return this.tasks.filter(
        (task) => task.priority === "medium" && !task.completed
      );
    },
    highPriorityTasks() {
      return this.tasks.filter(
        (task) => task.priority === "high" && !task.completed
      );
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
  },
  methods: {
    toggleTaskStatus(task) {
      this.$emit("toggle-task-status", task);
    },
  },
};
</script>
<style scoped>
div.theme--dark .bg-light {
  background-color: #1a1a1a;
}

.row-kanban {
  height: 84vh;
}

.bg-light {
  background-color: #f8f9fa;
}

h3 {
  padding-bottom: 1em !important;
  padding-top: 0.25em;
  background-color: #ececec;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.25));
  border-bottom-color: rgb(136, 136, 136) !important;
}

.pd {
  padding: 1.25rem;
}

.border-b {
  border-bottom: 3px solid #bdbdbd;
}

.col-low {
  border-bottom: 1px solid #90e0ef !important;
  border-width: 3px !important;
}

.col-medium {
  border-bottom: 1px solid #0077b6 !important;
  border-width: 3px !important;
}

.col-high {
  border-bottom: 1px solid #03045e !important;
  border-width: 3px !important;
}

.border-r {
  border-right: 1px solid #ddd;
}

.text-center {
  text-align: center;
}

.mb-2 {
  margin-bottom: 8px;
}

h3 {
  margin-bottom: 16px;
  color: #333;
}

.v-card {
  border: 1px solid #ddd;
  transition: box-shadow 0.3s;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-card > .v-card-title {
  font-weight: bold;
  color: red !important;
  border-bottom: 1px solid #ddd;
  width: 100% !important;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.col-completed {
  border-bottom: 1px solid green !important;
  border-width: 3px !important;
}
</style>
