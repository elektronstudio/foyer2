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
            userId: user.value.userId,
            userName: user.value.userName,
            value: {
              userColor: settings.userColor,
              userX: settings.userX,
              userY: settings.userY,
              userZ: settings.userZ,
            },
          })
        ),
      500
    )
  );

  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message && message.type === "USERS_UPDATE" && message.value) {
      users.value = message.value;
    }
  });

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
    window.addEventListener("beforeunload", leaveChannel);
  });

  onUnmounted(() => window.removeEventListener("beforeunload", leaveChannel));

  return { users, count, send: socket.send };
};
