<template>
  <v-card @click="goToTask" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{ card.title }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

      <div>{{ card.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-icon>mdi-email</v-icon>
      <span class="font-weight-bold">{{ card.messages.length }}</span>
      <span v-if="card.newMessage" class="new">New</span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["card"],
  methods: {
    goToTask() {
      this.$router.push(`/task/${this.card._id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  cursor: pointer;
  max-width: 300px;
  max-height: 400px;
  text-align: center;
  transition: all 0.5s ease;
  &:hover {
    background: lightgray;
  }
}
.new {
  margin-left: 0.5rem;
  font-size: 11px;
  padding: 0.2rem 0.3rem;
  border-radius: 999px;
  color: gold;
  background: darkblue;
}
</style>
