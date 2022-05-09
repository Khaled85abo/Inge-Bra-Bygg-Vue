<template>
  <v-container>
    <AllTasks v-if="view === 'allTasks'" />
    <CreateTask v-else />
  </v-container>
</template>

<script>
import AllTasks from "../components/AllTasks.vue";
import CreateTask from "../components/CreateTask.vue";
import Actions from "../store/action.types";
export default {
  components: { AllTasks, CreateTask },

  methods: {},

  computed: {
    view() {
      return this.$store.state.view;
    },
  },
  beforeCreate() {
    this.$store.dispatch(Actions.JOIN_ROOMS);
  },
  beforeMount() {
    if (!this.$store.state.user) this.$router.push("/login");
  },
};
</script>

<style lang="scss" scoped></style>
