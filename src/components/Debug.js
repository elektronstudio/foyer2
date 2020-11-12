import { inject, ref } from "../deps/vue.js";

import { socket, createMessage, useChannel } from "../lib/index.js";

export default {
  setup() {
    const show = ref(false);

    const sceneContext = inject("sceneContext");

    const { channels } = useChannel();

    document.addEventListener("keydown", (e) => {
      if (e.key === "d" && e.ctrlKey) {
        show.value = !show.value;
        console.log(show.value);
      }
    });

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

    return { show, onReset, channels };
  },
  template: `
  <div
    v-if="show"
    style="
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      color: white;
      opacity: 0.5;
      overflow: scroll;
      pointer-events: none;
    "
  >
    <pre>{{ JSON.stringify(channels,null,1) }}</pre>
  </div>
  <div
    v-if="show"
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
