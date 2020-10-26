import { createApp, ref } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeRect from "./src/components/ThreeRect.js";

const App = {
  components: { ThreeScene, ThreeRect },
  setup() {
    const a = ref(1);
    return { a };
  },
  template: `
  <three-scene>
    <three-rect :rotation="{ x: a, y: a, z: a}" />
  </three-scene>
  <input style="position: fixed; top: 10px; left: 10px;" type="range" min="1" max="180" step="0.001" v-model="a" /> -->
`,
};

const app = createApp(App);
app.mount("#app");
