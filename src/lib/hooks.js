import { ref, computed, onMounted, onUnmounted } from "../deps/vue.js";
import { socket, createMessage } from "./index.js";

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

export const useUsers = (channel, userId, userName) => {
  const users = ref([]);
  const count = computed(() => user.value.length);

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

  const onJoinChannel = () => {
    const outgoingMessage = createMessage({
      type: "CHANNEL_JOIN",
      channel: channel,
      userId: userId.value,
      userName: userName.value,
    });
    socket.send(outgoingMessage);
  };

  const onLeaveChannel = () => {
    const outgoingMessage = createMessage({
      type: "CHANNEL_LEAVE",
      channel: channel,
      userId: userId.value,
      userName: userName.value,
    });
    socket.send(outgoingMessage);
  };

  onMounted(() => {
    onJoinChannel();
    window.addEventListener("beforeunload", onLeaveChannel);
  });

  onUnmounted(() => window.removeEventListener("beforeunload", onStop));

  return { users, count };
};
