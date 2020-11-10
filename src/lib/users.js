import { ref, computed, onMounted, onUnmounted, watch } from "../deps/vue.js";
import {
  socket,
  createMessage,
  settings,
  throttle,
  websocketThrottle,
  useUser,
} from "./index.js";

export const useUsers = (channel) => {
  const users = ref([]);
  const user = useUser();
  watch(
    [
      () => settings.userColor,
      () => settings.userX,
      () => settings.userY,
      () => settings.userZ,
      () => settings.userRotationX,
      () => settings.userRotationY,
      () => settings.userRotationZ,
    ],
    throttle(
      () =>
        socket.send(
          createMessage({
            type: "USER_UPDATE",
            userId: user.userId,
            userName: user.userName,
            value: {
              userColor: settings.userColor,
              userX: settings.userX,
              userY: settings.userY,
              userZ: settings.userZ,
              userRotationX: settings.userRotationX,
              userRotationY: settings.userRotationY,
              userRotationZ: settings.userRotationZ,
            },
          })
        ),
      websocketThrottle
    ),
    { immediate: true }
  );

  // Experimental

  watch(
    [
      () => settings.materialColor,
      () => settings.lineColor,
      () => settings.lightColor,
      () => settings.panelOffset,
    ],
    throttle(
      () =>
        socket.send(
          createMessage({
            type: "SCENE_UPDATE",
            value: {
              materialColor: settings.materialColor,
              lineColor: settings.lineColor,
              lightColor: settings.lightColor,
              panelOffset: settings.panelOffset,
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
    // Experimental

    if (message && message.type === "SCENE_UPDATE" && message.value) {
      settings.materialColor = message.value.materialColor;
      settings.lineColor = message.value.lineColor;
      settings.lightColor = message.value.lightColor;
      settings.panelOffset = message.value.panelOffset;
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
