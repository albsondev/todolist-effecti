<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="task.title" label="Título" required></v-text-field>
    <v-textarea v-model="task.description" label="Descrição"></v-textarea>
    <v-select
      v-model="task.priority"
      :items="priorities"
      label="Prioridade"
      required
    ></v-select>
    <v-btn type="submit" color="primary">{{
      isEditing ? "Salvar" : "Adicionar"
    }}</v-btn>
  </v-form>
</template>

<script>
export default {
  props: ["taskData", "isEditing"],
  data() {
    return {
      task: this.taskData || { title: "", description: "", priority: "Média" },
      priorities: ["Baixa", "Média", "Alta"],
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.task); // Envia a tarefa para o componente pai (HomeView.vue)
    },
  },
};
</script>
