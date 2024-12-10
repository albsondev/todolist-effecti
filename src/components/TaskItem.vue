<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ task.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="$emit('edit-task', task)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('delete-task', task.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('toggle-status', task.id)">
        <v-icon>{{
          task.completed ? "mdi-check-circle" : "mdi-circle-outline"
        }}</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: ["task"],
};
</script>
