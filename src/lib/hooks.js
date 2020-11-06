import { ref, computed, onMounted, onUnmounted, watch } from "../deps/vue.js";
import {
  socket,
  createMessage,
  upsert,
  randomint,
  settings,
  throttle,
} from "./index.js";

export const useLocalstorage = (key = null, initialValue = null) => {
  const value = ref(initialValue);
  if (window.localStorage !== undefined) {
    if (initialValue !== null && key && !window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
    const localValue = computed({
      get: () => {
        let storedValue = null;
        if (key && window.localStorage.getItem(key)) {
          storedValue = JSON.parse(window.localStorage.getItem(key));
          return storedValue !== value.value ? storedValue : value.value;
        }
        return value.value;
      },
      set: (val) => {
        value.value = val;
        if (key) {
          window.localStorage.setItem(key, JSON.stringify(val));
        }
      },
    });
    return localValue;
  }
  return value;
};

export const useUsers = (channel, user) => {
  const users = ref([]);
  const count = computed(() => user.value.length);

  watch(
    () => settings.userColor,
    throttle(
      () =>
        socket.send(
          createMessage({
            type: "USER_UPDATE",
            userId: user.value.userId,
            userName: user.value.userName,
            value: { userColor: settings.userColor },
          })
        ),
      500
    )
  );

  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (
      message &&
      message.type === "CHANNEL_INFO" &&
      message.value &&
      message.value[channel] &&
      message.value[channel].users
    ) {
      users.value = message.value[channel].users;
    }
  });

  // socket.addEventListener("message", ({ data }) => {
  //   const message = JSON.parse(data);
  //   if (
  //     message &&
  //     message.userId &&
  //     message.type === "USER_UPDATE" &&
  //     message.value
  //   ) {
  //     const i = users.value.findIndex((user) => user.userId === message.userId);
  //     users.value[i] = { ...users.value[i], ...message.value };
  //     console.log(users.value);
  //   }
  // });

  const joinChannel = () => {
    const outgoingMessage = createMessage({
      type: "CHANNEL_JOIN",
      channel: channel,
      userId: user.value.userId,
      userName: user.value.userName,
      value: user.value,
    });
    socket.send(outgoingMessage);
  };

  // const userUpdate = () => {
  //   const outgoingMessage = createMessage({
  //     type: "USER_UPDATE",
  //     channel: channel,
  //     userId: user.value.userId,
  //     userName: user.value.userName,
  //     value: user.value,
  //   });
  //   socket.send(outgoingMessage);
  // };

  const leaveChannel = () => {
    const outgoingMessage = createMessage({
      type: "CHANNEL_LEAVE",
      channel: channel,
      userId: user.value.userId,
      userName: user.value.userName,
    });
    socket.send(outgoingMessage);
  };

  onMounted(() => {
    joinChannel();
    //userUpdate();
    window.addEventListener("beforeunload", leaveChannel);
  });

  onUnmounted(() => window.removeEventListener("beforeunload", leaveChannel));

  return { users, count, send: socket.send };
};
