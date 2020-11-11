import { ReconnectingWebsocket } from "../deps/reconnecting-websocket.js";

import { chatUrl, useUser, randomId } from "./index.js";

export const socket = new ReconnectingWebsocket(chatUrl);

// Create message

export const createMessage = (message) => {
  const { userId, userName } = useUser();
  return JSON.stringify({
    id: randomId(),
    datetime: new Date().toISOString(),
    userId: userId.value,
    userName: userName.value,
    type: "",
    channel: "",
    value: "",
    ...message,
  });
};
