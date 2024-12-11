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
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="localTask.date"
          label="Activity Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="localTask.date"
        :min="minDate"
        :max="maxDate"
        no-title
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
    <v-btn type="submit" color="primary">{{
      isEditing ? "Update Task" : "Add Task"
    }}</v-btn>
    <v-btn class="ml-2" @click="$emit('cancel')" color="secondary"
      >Cancel</v-btn
    >
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
        date: new Date().toISOString().substr(0, 10),
      }),
    },
  },
  data() {
    return {
      localTask: { ...this.task },
      priorities: ["low", "medium", "high"],
      menu: false,
      minDate: new Date().toISOString().substr(0, 10),
      maxDate: new Date(new Date().getFullYear(), 11, 31)
        .toISOString()
        .substr(0, 10),
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
      this.$emit("form-submitted");
    },
    resetForm() {
      this.localTask = {
        title: "",
        description: "",
        priority: "low",
        completed: false,
        date: new Date().toISOString().substr(0, 10),
      };
    },
    cancelEdit() {
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.ml-2 {
  margin-left: 10px;
}
</style>
