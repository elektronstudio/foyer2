import { createApp, ref } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";

const App = {
  components: { ThreeScene, ThreeGeometry },
  setup() {
    const a = ref(1);
    return { a };
  },
  template: `
  <three-scene>
    <three-geometry geometry="PlaneGeometry" :rotation="{ x: a, y: a, z: a}" />
  </three-scene>
  <input style="position: fixed; top: 10px; left: 10px;" type="range" min="1" max="180" step="0.001" v-model="a" /> -->
`,
};

const app = createApp(App);
app.mount("#app");
