import API from "../api";
import Actions from "./action.types";
import Mutations from "./mutation.types";
import router from "vue-router";

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    tasks: [],
    users: [],
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
    async [Actions.SEND_MESSAGE](context, data) {
      try {
        const res = await API.sendMessage(data.taskId, data.message);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    [Mutations.SET_USER](state, user) {
      state.user = user;
    },
    [Mutations.SET_TASKS](state, tasks) {
      state.tasks = tasks.tasks;
    },
    [Mutations.SET_USERS](state, users) {
      state.users = users;
    },
  },
  getters: {
    clients(state) {
      return state.users.filter((user) => user.role == "client");
    },
    workers(state) {
      return state.users.filter((user) => user.role == "worker");
    },
  },
  modules: {},
});
