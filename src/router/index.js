import Vue from "vue";

import VueRouter from "vue-router";
import Home from "../views/HomeView";
import Login from "../views/LoginView.vue";
import UserProfile from "../views/UserProfile.vue";
import TaskView from "../views/TaskView";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: UserProfile,
  },
  {
    path: "/task/:id",
    name: "taskView",
    component: TaskView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
