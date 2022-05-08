<template>
  <div class="home">
    <v-container>
      <v-form>
        <v-row md="6">
          <v-col>
            <v-text-field
              v-model="user.email"
              color="purple darken-2"
              label="First name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row md="6">
          <v-col>
            <v-text-field
              v-model="user.password"
              color="purple darken-2"
              label="First name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn @click="login">
          <span>Login</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Actions from "../store/action.types";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      user: {
        email: "johan@ibb.se",
        password: "123",
      },
    };
  },
  methods: {
    login() {
      console.log(this.user);
      this.$store.dispatch(Actions.LOGIN, this.user);
    },
  },
};
</script>
<style scoped></style>
