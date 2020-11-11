import { reactive, watch } from "../deps/vue.js";

import {
  throttle,
  socket,
  createMessage,
  random,
  trunc,
  randomHexColor,
} from "./index.js";
import { channel, throttleTimeout } from "../../config.js";

export const initialSettings = [
  {
    user: true,
    key: "userColor",
    title: "User color",
    type: "color",
    value: randomHexColor(),
  },
  {
    user: true,
    key: "userX",
    title: "User X coordinate",
    type: "range",
    value: trunc(random(-2, 2), 1),
    min: -2,
    max: 2,
    step: 0.01,
  },
  {
    user: true,
    key: "userY",
    title: "User Y coordinate",
    type: "range",
    value: trunc(random(1, 3), 1),
    min: 1,
    max: 3,
    step: 0.01,
  },
  {
    user: true,
    key: "userZ",
    title: "User Z coordinate",
    type: "range",
    value: trunc(random(4, 6), 1),
    min: 4,
    max: 6,
    step: 0.01,
  },
  {
    user: true,
    key: "userRotationX",
    title: "User X rotation",
    type: "range",
    value: 0,
    min: -45,
    max: 45,
    step: 0.01,
  },
  {
    user: true,
    key: "userRotationY",
    title: "User Y rotation",
    type: "range",
    value: 0,
    min: -45,
    max: 45,
    step: 0.01,
  },
  {
    user: true,
    key: "userRotationZ",
    title: "User Z rotation",
    type: "range",
    value: 0,
    min: -45,
    max: 45,
    step: 0.01,
  },
  {
    key: "materialColor",
    title: "Material color",
    type: "color",
    value: "#111111",
  },
  {
    key: "lineColor",
    title: "Line color",
    type: "color",
    value: "#ffffff",
  },
  {
    key: "lightColor",
    title: "Light color",
    type: "color",
    value: "#ffffff",
  },
  {
    key: "panelOffset",
    title: "Panel offset",
    type: "range",
    value: 0,
    min: -5,
    max: 0,
    step: 0.01,
  },
  // {
  //   key: "videoOffset",
  //   title: "Video offset",
  //   type: "range",
  //   value: -10,
  //   min: -10,
  //   max: 1.5,
  //   step: 0.1,
  // },
  // {
  //   key: "videoColor",
  //   title: "Video color",
  //   type: "color",
  //   value: "#ffffff",
  // },
  // {
  //   key: "avatarOffset",
  //   title: "Avatar offset",
  //   type: "range",
  //   value: -10,
  //   min: -10,
  //   max: 0,
  //   step: 0.1,
  // },
  // {
  //   key: "text2",
  //   title: "Title",
  //   type: "text",
  //   value: "elektron",
  // },
  // {
  //   key: "text",
  //   title: "Text",
  //   type: "textarea",
  //   rows: 5,
  //   value:
  //     "elektron.live is virtual performative space. It brings performers and audiences together in both physical and online world.",
  // },
  // {
  //   key: "fontSize",
  //   title: "Font size",
  //   type: "range",
  //   value: 0.25,
  //   min: 0.2,
  //   max: 1.8,
  //   step: 0.05,
  // },
  // {
  //   key: "fontColor",
  //   title: "Font color",
  //   type: "color",
  //   value: "#ffffff",
  // },
  // {
  //   key: "avatarType",
  //   title: "Avatar type",
  //   type: "range",
  //   value: 0,
  //   max: 2,
  // },
  // {
  //   key: "avatarColor",
  //   title: "Avatar color",
  //   type: "color",
  //   value: "#ffff00",
  // },
  // {
  //   key: "panelScale",
  //   title: "Panel scale",
  //   type: "range",
  //   value: 1,
  //   min: 1,
  //   max: 3,
  //   step: 0.01,
  // },
];

export const useSettings = () => {
  const settings = reactive(
    Object.fromEntries(initialSettings.map(({ key, value }) => [key, value]))
  );

  const broadcastSettings = () => {
    const outgoingMessage = createMessage({
      type: "CHANNEL_USER_UPDATE",
      channel,
      value: Object.fromEntries(
        initialSettings
          .filter(({ user }) => user)
          .map(({ key, value }) => [key, settings[key]])
      ),
    });
    socket.send(outgoingMessage);
  };

  const keys = initialSettings.filter(({ user }) => user).map(({ key }) => key);
  watch(
    keys.map((key) => {
      return () => settings[key];
    }),
    throttle(broadcastSettings, throttleTimeout),
    { immediate: true }
  );
  return settings;
};
