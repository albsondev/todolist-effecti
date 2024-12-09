<template>
  <v-card outlined>
    <v-card-title>
      {{ task.title }}
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('edit', task)"
        ><v-icon>mdi-pencil</v-icon></v-btn
      >
      <v-btn icon @click="$emit('delete', task.id)"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text>{{ task.description }}</v-card-text>
    <v-chip>{{ task.priority }}</v-chip>
  </v-card>
</template>

<script>
export default {
  props: ["task"],
};
</script>
