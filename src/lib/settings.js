import { reactive } from "../deps/vue.js";

export const initialSettings = [
  {
    key: "userX",
    title: "User X coordinate",
    type: "range",
    value: 0,
    min: -5,
    max: 5,
    step: 0.01,
  },
  {
    key: "userY",
    title: "User Y coordinate",
    type: "range",
    value: 0,
    min: 0,
    max: 5,
    step: 0.01,
  },
  {
    key: "userZ",
    title: "User Z coordinate",
    type: "range",
    value: 0,
    min: 5,
    max: 10,
    step: 0.01,
  },
  {
    key: "userColor",
    title: "User color",
    type: "color",
    value: "#ddaaff",
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

export const settings = reactive(
  Object.fromEntries(initialSettings.map(({ key, value }) => [key, value]))
);
