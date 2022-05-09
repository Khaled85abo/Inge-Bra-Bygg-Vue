import Actions from "../store/action.types";
export default function createWebSocketPlugin(socket) {
  return (store) => {
    store.$socket = socket;
    socket.on("message", (payload) =>
      store.dispatch(Actions.RECIEVE_MESSAGE, payload)
    );
  };
}
