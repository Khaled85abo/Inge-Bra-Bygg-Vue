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
    <v-btn>
      <router-link v-if="!user" to="/login">Login</router-link>
      <router-link v-else to="/">Logout</router-link>
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
import Actions from "../store/action.types";

export default {
  methods: {
    navProfile() {
      this.$router.push("/profile");
    },
    changeView(view) {
      this.$store.dispatch(Actions.CHANGE_VIEW, view);
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
