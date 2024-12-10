<template>
  <v-sheet height="500">
    <v-calendar
      :now="today"
      :value="today"
      color="primary"
      @click:day="handleDayClick"
    >
      <template v-slot:day="{ date }">
        <v-row class="fill-height">
          <template v-if="tracked[date]">
            <v-sheet
              v-for="(task, i) in tracked[date]"
              :key="i"
              :title="task.title"
              :color="getTaskColor(task.priority)"
              :width="`${getTaskPercentage(date, task.priority)}%`"
              height="100%"
              tile
            ></v-sheet>
          </template>
        </v-row>
      </template>
    </v-calendar>
  </v-sheet>
</template>

<script>
export default {
  props: ["tracked"],
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    getTaskColor(priority) {
      switch (priority) {
        case "low":
          return "#90e0ef";
        case "medium":
          return "#0077b6";
        case "high":
          return "#03045e";
        default:
          return "grey";
      }
    },
    getTaskPercentage(date, priority) {
      const tasks = this.tracked[date];
      const count = tasks.filter((task) => task.priority === priority).length;
      return (count / tasks.length) * 100;
    },
    handleDayClick({ date }) {
      this.$emit("handleDayClick", { date });
    },
  },
};
</script>
