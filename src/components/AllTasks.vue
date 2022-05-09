<template>
  <div class="articles">
    <TaskCard v-for="task of tasks" :key="task._id" :card="task" />
  </div>
</template>

<script>
import TaskCard from "./TaskCard.vue";

export default {
  components: { TaskCard },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
};
</script>

<style lang="scss" scoped>
.articles {
  padding: 1rem;
  background: #f2f2f2;
  max-width: 800px;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>
