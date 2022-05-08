<template>
  <v-container>
    <div class="articles">
      <TaskCard v-for="task of tasks" :key="task._id" :card="task" />
    </div>

    <v-row justify="center" class="py-2">
      <h2>Create a new task</h2>
    </v-row>
    <v-row justify="center" v-if="myInfo && myInfo.role == 'worker'">
      <form @submit.prevent="createTask">
        <div>
          <input type="file" placeholder="Image" ref="taskImg" />
        </div>
        <div>
          <input type="text" v-model="task.title" placeholder="Title" />
        </div>
        <div>
          <input
            type="text"
            v-model="task.description"
            placeholder="Descriptin"
          />
        </div>
        <v-row align="center">
          <v-col cols="6">
            <v-subheader> Client </v-subheader>
          </v-col>

          <v-col cols="6">
            <v-select
              :hint="`${clients[0].name}, ${clients[0].role}`"
              :items="clients"
              item-text="name"
              item-value="role"
              label="Client"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </v-col>
        </v-row>
        <div>
          All Clients
          <select v-model="task.clientId">
            <option
              v-for="client of clients"
              :key="client._id"
              :value="client._id"
            >
              {{ client.name }}
            </option>
          </select>
        </div>
        {{ task.workersID }}
        <div v-for="worker of workers" :key="worker._id">
          <v-checkbox
            v-model="task.workersID"
            :label="worker.name"
            :value="worker._id"
            :checked="worker._id === myInfo._id"
          ></v-checkbox>
        </div>

        <button>Add Task</button>
      </form>
    </v-row>
    <v-row justify="center">
      <v-card color="blue-grey darken-1" dark :loading="isUpdating">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="friends"
                  :disabled="isUpdating"
                  :items="people"
                  filled
                  chips
                  color="blue-grey lighten-2"
                  label="Select"
                  item-text="name"
                  item-value="name"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      @click="data.select"
                      @click:close="remove(data.item)"
                    >
                      <v-avatar left>
                        <v-img :src="data.item.avatar"></v-img>
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content
                        v-text="data.item"
                      ></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="data.item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="data.item.group"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import TaskCard from "../components/TaskCard.vue";
import io from "socket.io-client";
import Actions from "../store/action.types";
export default {
  components: { TaskCard },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };
    return {
      socket: {},
      task: {
        title: "title",
        description: "description",
        clientId: "",
        workersID: [],
      },
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
        { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
        { name: "John Smith", group: "Group 2", avatar: srcs[1] },
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] },
      ],
      title: "The summer breeze",
    };
  },

  methods: {
    async createTask() {
      if (this.task.clientId === "" || this.task.workersID.length === 0) return;
      let imgPath = "";
      if (this.$refs.taskImg.files[0]) {
        imgPath = this.$refs.taskImg.files[0].name;
      }
      console.log(this.task);
      const formData = new FormData();
      formData.append("taskImg", this.$refs.taskImg.files[0]);
      await this.$store.dispatch(Actions.CREATE_TASK, {
        img: formData,
        task: { ...this.task, imgPath },
      });
    },
    toggleWorker(id) {
      const index = this.task.workersID.indexOf(id);
      if (index > -1) {
        this.task.workersID.splice(index, 1);
      } else {
        this.task.workersID.push(id);
      }
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
  },

  computed: {
    myInfo() {
      return this.$store.state.user;
    },
    tasks() {
      return this.$store.state.tasks;
    },
    clients() {
      return this.$store.getters.clients;
    },
    workers() {
      return this.$store.getters.workers;
    },
  },
  created() {
    this.socket = io("http://localhost:5050");
    console.log(this.socket);
  },
  beforeMount() {
    if (!this.$store.state.user) this.$router.push("/login");
  },
  mounted() {
    this.task.workersID.push(this.myInfo._id);
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
