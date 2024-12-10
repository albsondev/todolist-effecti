<template>
  <v-list>
    <task-item
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit-task="editTask"
      @delete-task="deleteTask"
      @toggle-status="toggleTaskStatus"
    />
  </v-list>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  components: { TaskItem },
  props: ["tasks"],
  methods: {
    editTask(task) {
      this.$emit("edit-task", task);
    },
    deleteTask(id) {
      this.$emit("delete-task", id);
    },
    toggleTaskStatus(id) {
      this.$emit("toggle-status", id);
    },
  },
};
</script>
