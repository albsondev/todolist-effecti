<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>ToDoList - Effecti</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="primary" dark>
      <span class="white--text">© 2024 - Feito com ❤️ por André Albson</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isDarkTheme: false,
    };
  },
  computed: {
    themeIcon() {
      return this.isDarkTheme ? "mdi-weather-sunny" : "mdi-weather-night";
    },
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.$vuetify.theme.dark = this.isDarkTheme;
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
</style>
