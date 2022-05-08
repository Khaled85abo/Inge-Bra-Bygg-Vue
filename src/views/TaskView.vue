<template>
  <div>
    <h3>
      {{ task.title }}
    </h3>
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg" placeholder="Add your message" />
      <button>SEND</button>
    </form>
    <ul>
      <li
        v-for="msg of task.messages"
        :key="msg._id"
        :class="msg.userId == myInfo._id ? 'mine' : ''"
      >
        {{ msg.content }}
      </li>
    </ul>
  </div>
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
  //   computed: {
  //     task() {
  //       return this.$store.state.tasks.find(
  //         (task) => task._id == this.$route.params.id
  //       );
  //     },
  //   },
  // sockets: {
  //   connect: function () {
  //     console.log("socket connected");
  //   },
  //   // listning to server emits
  //   customEmit: function (data) {
  //     console.log(
  //       'this method was fired by the socket server. eg: io.emit("customEmit", data)',
  //       data
  //     );
  //   },
  // },
  methods: {
    sendMsg() {
      // emitting message to server
      // this.$socket.emit('emit_method', data)
      const message = { content: this.msg };
      this.$store.dispatch(Actions.SEND_MESSAGE, {
        message,
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
