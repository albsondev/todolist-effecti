<template>
  <v-sheet height="70vh">
    <v-calendar
      class="bg-light"
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
              :color="getTaskColor(task)"
              :width="`${getTaskPercentage(date, task)}%`"
              height="100%"
              tile
            ></v-sheet>
          </template>
        </v-row>
      </template>
    </v-calendar>
    <priority-legend />
  </v-sheet>
</template>

<script>
import PriorityLegend from "./PriorityLegend.vue";

export default {
  components: { PriorityLegend },
  props: ["tracked"],
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    getTaskColor(task) {
      if (task.completed) {
        return "#20bf6b";
      } else {
        switch (task.priority) {
          case "low":
            return "#90e0ef";
          case "medium":
            return "#0077b6";
          case "high":
            return "#03045e";
          default:
            return "grey";
        }
      }
    },
    getTaskPercentage(date, task) {
      const tasks = this.tracked[date];
      if (!tasks) return 0;

      const count = tasks.filter(
        (t) => t.priority === task.priority && t.completed === task.completed
      ).length;
      if (!tasks.length) return 0;

      return (count / tasks.length) * 100;
    },
    handleDayClick({ date }) {
      this.$emit("handleDayClick", { date });
    },
  },
};
</script>

<style scoped>
div.theme--dark .bg-light {
  background-color: #1a1a1a;
}

.bg-light {
  background-color: #f8f9fa;
}
</style>
