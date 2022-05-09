<template>
  <v-app id="app">
    <NavBar id="nav-bar" />

    <v-main id="scrolling-techniques-2" class="overflow-y-auto">
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
#scrolling-techniques-2 {
  background: url("./assets/blocks.jpg") no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
}

#nav-bar {
  position: sticky;
  top: 0;
}
</style>
