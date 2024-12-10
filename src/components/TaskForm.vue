<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="localTask.title"
      label="Title"
      required
    ></v-text-field>
    <v-textarea
      v-model="localTask.description"
      label="Description"
    ></v-textarea>
    <v-select
      v-model="localTask.priority"
      :items="priorities"
      label="Priority"
    ></v-select>
    <v-btn type="submit" color="primary">{{
      isEditing ? "Update Task" : "Add Task"
    }}</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        priority: "low",
        completed: false,
      }),
    },
  },
  data() {
    return {
      localTask: { ...this.task },
      priorities: ["low", "medium", "high"],
    };
  },
  computed: {
    isEditing() {
      return !!this.task.id;
    },
  },
  watch: {
    task: {
      handler(newTask) {
        this.localTask = { ...newTask };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("save-task", {
        ...this.localTask,
        id: this.task.id || Date.now(),
      });
      this.resetForm();
    },
    resetForm() {
      this.localTask = {
        title: "",
        description: "",
        priority: "low",
        completed: false,
      };
    },
  },
};
</script>
