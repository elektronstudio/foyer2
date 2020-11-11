import { inject } from "../deps/vue.js";

import { socket, createMessage, useUsers } from "../lib/index.js";

export default {
  setup() {
    const sceneContext = inject("sceneContext");
    socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message && message.type === "CHAT" && message.value === "/reset") {
        window.localStorage.clear();
        window.location.reload();
        sceneContext.update();
      }
    });

    const onReset = () => {
      socket.send(
        createMessage({
          type: "CHAT",
          channel: "foyer2",
          value: "/reset",
        })
      );
    };
    return { onReset };
  },
  template: `
  <div
    style="
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 15px;
      transform: scale(0.5);
      opacity: 0.5;
    "
  >
    <button @click="onReset">Reset</button>
  </div>
  `,
};
