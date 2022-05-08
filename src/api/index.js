import axios from "axios";
axios.defaults.baseURL = "http://localhost:5050/api";

const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
};

const login = (data) => axios.post("/user/auth", data);
const getMe = () => axios.get("/user/me");
const sendMessage = (taskId, message) =>
  axios.post(`/task/${taskId}/sendMessage`, message);
const getAllTasks = () => axios.get("/tasks/allTasks");
const getAllUsers = () => axios.get("/user/all");
const createTask = (task) => axios.post("/tasks/create", task);
const uploadImg = (taskId, img) =>
  axios.post(`/tasks/upload/${taskId}/img`, img);
export default {
  setToken,
  login,
  getMe,
  getAllTasks,
  getAllUsers,
  uploadImg,
  createTask,
  sendMessage,
};
