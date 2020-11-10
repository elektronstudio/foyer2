import { ref, computed, onMounted, onUnmounted, watch } from "../deps/vue.js";
import {
  socket,
  createMessage,
  settings,
  throttle,
  websocketThrottle,
} from "./index.js";

export const useUsers = (channel, user) => {
  const users = ref([]);
  watch(
    [
      () => settings.userColor,
      () => settings.userX,
      () => settings.userY,
      () => settings.userZ,
    ],
    throttle(
      () =>
        socket.send(
          createMessage({
            type: "USER_UPDATE",
            userId: "123",
            userName: "kika",
            value: {
              userColor: settings.userColor,
              userX: settings.userX,
              userY: settings.userY,
              userZ: settings.userZ,
            },
          })
        ),
      websocketThrottle
    ),
    { immediate: true }
  );

  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message && message.type === "USERS_UPDATE" && message.value) {
      users.value = message.value;
    }
  });

  // const joinChannel = () => {
  //   const outgoingMessage = createMessage({
  //     type: "CHANNEL_JOIN",
  //     channel: channel,
  //     userId: user.value.userId,
  //     userName: user.value.userName,
  //     value: user.value,
  //   });
  //   socket.send(outgoingMessage);
  // };

  // const leaveChannel = () => {
  //   const outgoingMessage = createMessage({
  //     type: "CHANNEL_LEAVE",
  //     channel: channel,
  //     userId: user.value.userId,
  //     userName: user.value.userName,
  //   });
  //   socket.send(outgoingMessage);
  // };

  // onMounted(() => {
  //   //joinChannel();
  //   window.addEventListener("beforeunload", leaveChannel);
  // });

  // onUnmounted(() => window.removeEventListener("beforeunload", leaveChannel));

  return users;
};
