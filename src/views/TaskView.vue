<template>
  <v-container>
    <v-row justify="center">
      <h3>
        {{ task.title }}
      </h3>
    </v-row>
    <v-row justify="center" class="py-3">
      <form @submit.prevent="sendMsg">
        <input type="text" v-model="msg" placeholder="Add your message" />
        <v-btn class="mx-1" type="submit">
          <span>Send Message</span>
        </v-btn>
      </form>
    </v-row>
    <ul>
      <li
        v-for="msg of task.messages"
        :key="msg._id"
        :class="msg.userId == myInfo._id ? 'mine' : ''"
      >
        {{ msg.content }}
      </li>
    </ul>
  </v-container>
</template>

<script>
import Actions from "../store/action.types";
export default {
  data() {
    return {
      task: null,
      msg: "",
    };
  },
  methods: {
    sendMsg() {
      this.$store.dispatch(Actions.SEND_MESSAGE, {
        msg: this.msg,
        taskId: this.task._id,
      });
    },
  },
  beforeMount() {
    const theTask = this.$store.state.tasks.find(
      (task) => task._id == this.$route.params.id
    );
    this.task = theTask;
    console.log(this.task);
  },
  mounted() {
    this.$store.dispatch(Actions.MESSAGE_SEEN, this.$route.params.id);
  },
  beforeUpdate() {
    this.$store.dispatch(Actions.MESSAGE_SEEN, this.$route.params.id);
  },
  computed: {
    myInfo() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
ul {
  max-width: 500px;
  margin: auto;
  list-style-type: none;
}
.mine {
  background: rgb(139, 149, 149);
  color: white;
}
</style>
