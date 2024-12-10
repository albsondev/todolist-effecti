<template>
  <v-row>
    <v-col cols="12" md="4">
      <h3>Baixa</h3>
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
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <h3>Média</h3>
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
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <h3>Alta</h3>
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
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["tasks"],
  computed: {
    lowPriorityTasks() {
      return this.tasks.filter((task) => task.priority === "low");
    },
    mediumPriorityTasks() {
      return this.tasks.filter((task) => task.priority === "medium");
    },
    highPriorityTasks() {
      return this.tasks.filter((task) => task.priority === "high");
    },
  },
};
</script>

<style scoped lang="scss">
.mb-2 {
  margin-bottom: 8px;
}

h3 {
  margin-bottom: 16px;
  color: #333;
}

v-card {
  border: 1px solid #ddd;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  v-card-title {
    font-weight: bold;
    color: red !important;
    border-bottom: 1px solid #ddd;
    width: 100% !important;
  }

  v-card-subtitle {
    color: #666;
  }

  v-card-actions {
    justify-content: flex-end;
  }
}
</style>
