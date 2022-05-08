<template>
  <v-app id="app">
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style scoped>
#app {
  background: url("./assets/blocks.jpg") no-repeat center center fixed;
  background-size: cover;
}
</style>
