import { ReconnectingWebsocket } from "../deps/reconnecting-websocket.js";

import { chatUrl } from "./index.js";

export const socket = new ReconnectingWebsocket(chatUrl);

export const createMessage = (message) => {
  const id = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .sort(() => Math.random() - 0.5)
    .slice(0, 16)
    .join("");
  return JSON.stringify({
    id,
    datetime: new Date().toISOString(),
    type: "",
    channel: "",
    userId: "",
    userName: "",
    value: "",
    ...message,
  });
};
