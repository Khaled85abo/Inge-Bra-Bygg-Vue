import API from "../api";
import Actions from "./action.types";
import Mutations from "./mutation.types";
import Vue from "vue";
import Vuex from "vuex";
import router from "vue-router";
import socket from "../socket";
import createWebSocketPlugin from "../socket/websocketStorePlugin";

Vue.use(Vuex);
const websocketPlugin = createWebSocketPlugin(socket);
export default new Vuex.Store({
  state: {
    user: null,
    tasks: [],
    users: [],
    view: "allTasks",
  },
  actions: {
    async [Actions.LOGIN](context, loginData) {
      try {
        const res = await API.login(loginData);
        const data = res.data;
        console.log(res);
        if (data.token) {
          API.setToken(data.token);
          await context.dispatch(Actions.GET_ME);
          await context.dispatch(Actions.GET_TASKS);
          await context.dispatch(Actions.GET_ALL_USERS);
          router.push("/profile");
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async [Actions.GET_ME](context) {
      try {
        const res = await API.getMe();
        const user = res.data;
        context.commit(Mutations.SET_USER, user);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async [Actions.GET_TASKS](context) {
      console.log("inside store get tasks");
      try {
        const res = await API.getAllTasks();
        const data = res.data;
        console.log("tasks from server: ", res);
        context.commit(Mutations.SET_TASKS, data);
        // Connect to task rooms
      } catch (error) {
        console.log(error);
      }
    },
    async [Actions.GET_ALL_USERS]({ commit }) {
      try {
        const res = await API.getAllUsers();
        console.log("all users: ", res.data);
        commit(Mutations.SET_USERS, res.data.users);
      } catch (error) {
        console.log(error);
      }
    },
    async [Actions.CREATE_TASK](context, obj) {
      try {
        const taskRes = await API.createTask(obj.task);
        const taskId = taskRes.data.task.id;
        console.log("respons create task: ", taskRes);
        if (taskId) {
          const imgRes = await API.uploadImg(taskId, obj.img);
          console.log("response from uploading image: ", imgRes);
          console.log(imgRes);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // async [Actions.SEND_MESSAGE](context, data) {
    //   try {
    //     const res = await API.sendMessage(data.taskId, data.message);
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    [Actions.CHANGE_VIEW](context, view) {
      context.commit(Mutations.CHANGE_VIEW, view);
    },
    // [Actions.SOCKET_CONNECT]({ commit, dispatch }) {
    //   const socket = io("http://localhost:5050");
    //   commit(Mutations.SET_SOCKET, socket);
    //   dispatch(Actions.JOIN_ROOMS);
    //   console.log(socket);
    // },
    [Actions.JOIN_ROOMS](context) {
      console.log(
        "connecting to socket rooms: ",
        context.state.tasks,
        context.state.user
      );
      this.$socket.emit("joinRooms", {
        rooms: context.state.tasks.map((task) => task._id),
        user: context.state.user,
      });
    },
    [Actions.SEND_MESSAGE](context, { msg, taskId }) {
      this.$socket.emit("message", {
        msg,
        user: context.state.user,
        room: taskId,
      });
    },
    [Actions.RECIEVE_MESSAGE]({ commit }, payload) {
      console.log("recieved task from socket: ", payload);
      commit(Mutations.UPDATE_MESSAGES, payload);
    },
    [Actions.MESSAGE_SEEN]({ commit }, taskId) {
      commit(Mutations.SET_MESSAGE_SEEN, taskId);
    },
  },
  mutations: {
    [Mutations.SET_USER](state, user) {
      state.user = user;
    },
    [Mutations.SET_TASKS](state, tasks) {
      state.tasks = tasks.tasks.map((task) => {
        return { ...task, newMessage: false };
      });
    },
    [Mutations.SET_USERS](state, users) {
      state.users = users;
    },
    [Mutations.CHANGE_VIEW](state, view) {
      state.view = view;
    },
    [Mutations.SET_SOCKET](state, socket) {
      state.socket = socket;
    },
    [Mutations.UPDATE_MESSAGES](state, payload) {
      // Replace the whole task with the new one
      // const index = state.tasks.findIndex(task => task._id == payload._id)
      // state.tasks.splice(index, 1, payload)

      // Replace messages of the task with the new messages
      const task = state.tasks.find((task) => task._id == payload._id);
      task.messages = payload.messages;
      task.newMessage = true;

      // Reorder tasks to show the one with new messages first
      state.tasks.sort((a, b) => Number(b.newMessage) - Number(a.newMessage));
    },
    [Mutations.SET_MESSAGE_SEEN](state, taskId) {
      const index = state.tasks.findIndex((t) => t._id == taskId);
      state.tasks[index].newMessage = false;
    },
  },
  getters: {
    clients(state) {
      return state.users.filter((user) => user.role == "client");
    },
    workers(state) {
      return state.users.filter((user) => user.role == "worker");
    },
    newMessages(state) {
      return state.tasks.filter((task) => task.newMessage == true).length;
    },
  },
  modules: {},
  plugins: [websocketPlugin],
});
