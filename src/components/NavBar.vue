<template>
  <v-app-bar
    absolute
    color="#BFBFBF"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-img
      alt="Vuetify Logo"
      class="shrink mr-2"
      contain
      src="../assets/sink.svg"
      transition="scale-transition"
      width="40"
    />
    <v-toolbar-title>Inge bra bygg</v-toolbar-title>

    <v-spacer></v-spacer>
    <div v-if="user">
      <v-btn class="mx-1" @click="changeView('allTasks')">
        <span>All Tasks</span>
      </v-btn>
      <v-btn class="mx-1" @click="changeView('createTask')">
        <span>Create Task</span>
      </v-btn>
      <v-btn class="mx-1">
        <router-link to="/profile">Profile</router-link>
        <v-icon>mdi-account-details</v-icon>
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-btn v-if="!user">
        <router-link to="/login">Login</router-link>
      </v-btn>
      <v-btn v-else @click="logout"> Logout </v-btn>
    </div>

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
import Actions from "../store/action.types";

export default {
  methods: {
    navProfile() {
      this.$router.push("/profile");
    },
    changeView(view) {
      this.$store.dispatch(Actions.CHANGE_VIEW, view);
    },
    logout() {
      this.$store.dispatch(Actions.LOGOUT);
      this.$router.push("/login");
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
