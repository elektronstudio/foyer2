import { inject } from "../deps/vue.js";

import { socket, createMessage } from "../lib/index.js";

export default {
  setup() {
    const sceneContext = inject("sceneContext");
    socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message && message.type === "RESET") {
        window.localStorage.clear();
        window.location.reload();
        sceneContext.update();
      }
    });

    const onReset = () => {
      socket.send(
        createMessage({
          type: "RESET",
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
      opacity: 0.5;
    "
  >
    <button @click="onReset">Reset</button>
  </div>
  `,
};
