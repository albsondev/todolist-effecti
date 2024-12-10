<template>
  <div>
    <v-list v-if="tasks.length">
      <task-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit-task="$emit('edit-task', task)"
        @delete-task="$emit('delete-task', task.id)"
        @toggle-status="$emit('toggle-status', task.id)"
      />
    </v-list>
    <v-alert
      v-else
      text
      dense
      color="blue-grey"
      icon="mdi-clock-fast"
      border="left"
      class="mt-4"
    >
      Sem atividades cadastradas.
    </v-alert>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  components: { TaskItem },
  props: ["tasks"],
};
</script>

<style scoped>
.mt-4 {
  margin-top: 16px;
}
</style>
