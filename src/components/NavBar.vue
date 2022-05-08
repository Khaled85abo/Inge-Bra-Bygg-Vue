<template>
  <v-app-bar
    absolute
    color="#fcb69f"
    dark
    shrink-on-scroll
    src="../assets/blocks.jpg"
    scroll-target="#scrolling-techniques-2"
  >
    <!-- <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template> -->
    <v-img
      alt="Vuetify Logo"
      class="shrink mr-2"
      contain
      src="../assets/sink.svg"
      transition="scale-transition"
      width="40"
    />
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-app-bar-title>Inge bra bygg</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-btn @click="navProfile">
      <router-link v-if="!user" to="/login">Login</router-link>
      <router-link v-else to="/profile">Profile</router-link>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    navProfile() {
      this.$router.push("/profile");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style></style>
