<template>
  <v-container>
    <v-row v-for="task in tasks" :key="task.id">
      <task-item
        :task="task"
        @edit="$emit('edit', task)"
        @delete="$emit('delete', task.id)"
      />
    </v-row>
  </v-container>
</template>

<script>
import TaskItem from "@/components/TaskItem.vue";

export default {
  props: ["tasks"],
  components: { TaskItem },
};
</script>
