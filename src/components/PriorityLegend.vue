<template>
  <v-row class="priority-legend">
    <v-col cols="12" md="3" class="text-center">
      <v-badge color="#90e0ef" bottom inline tile>
        <span>Low Priority</span>
      </v-badge>
    </v-col>
    <v-col cols="12" md="3" class="text-center">
      <v-badge color="#0077b6" bottom inline tile>
        <span>Medium Priority</span>
      </v-badge>
    </v-col>
    <v-col cols="12" md="3" class="text-center">
      <v-badge color="#03045e" bottom inline tile>
        <span>High Priority</span>
      </v-badge>
    </v-col>
    <v-col cols="12" md="3" class="text-center">
      <v-badge color="#20bf6b" bottom inline tile>
        <span>Completed Tasks</span>
      </v-badge>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PriorityLegend",
};
</script>

<style scoped>
.priority-legend {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  font-size: small;
}

.theme--dark .priority-legend {
  background-color: #1a1a1a;
}

.v-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-left: 0.25em !important;
}

.v-badge span {
  margin-left: 8px;
  font-weight: bold;
}
</style>
