<template>
  <v-container>
    <v-row justify="space-between" align="center" class="mb-4">
      <v-text-field
        v-model="search"
        label="Buscar tarefas"
        prepend-icon="mdi-magnify"
        clearable
      />

      <v-btn color="primary" @click="openTaskForm">
        <v-icon left>mdi-plus</v-icon>
        Nova Tarefa
      </v-btn>
    </v-row>

    <task-list :tasks="filteredTasks" @edit="editTask" @delete="deleteTask" />

    <v-dialog v-model="isTaskFormVisible" max-width="600px">
      <task-form
        :task-data="taskToEdit"
        :is-editing="isEditing"
        @submit="handleTaskFormSubmit"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import TaskForm from "@/components/TaskForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    TaskList,
    TaskForm,
  },
  data() {
    return {
      search: "",
      isTaskFormVisible: false,
      taskToEdit: null,
      isEditing: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["getAllTasks"]),

    filteredTasks() {
      if (!this.search) return this.getAllTasks;
      return this.getAllTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(this.search.toLowerCase()) ||
          task.description.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions("tasks", ["addTask", "editTask", "deleteTask"]),

    // Abre o modal para criar uma nova tarefa
    openTaskForm() {
      this.taskToEdit = null;
      this.isEditing = false;
      this.isTaskFormVisible = true;
    },

    // Recebe os dados enviados pelo formulário (nova tarefa ou edição)
    handleTaskFormSubmit(task) {
      if (this.isEditing) {
        this.editTask(task);
      } else {
        this.addTask(task);
      }
      this.closeTaskForm();
    },

    // Preenche os dados de uma tarefa a ser editada e abre o modal
    editTask(task) {
      this.taskToEdit = { ...task };
      this.isEditing = true;
      this.isTaskFormVisible = true;
    },

    // Fecha o modal de formulário
    closeTaskForm() {
      this.isTaskFormVisible = false;
      this.taskToEdit = null;
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
</style>
