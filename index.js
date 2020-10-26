import { createApp, ref } from "./src/deps/vue.js";
import Scene from "./src/components/Scene.js";
import Geometry from "./src/components/Geometry.js";

const App = {
  components: { Scene, Geometry },
  setup() {
    const a = ref(1);
    return { a };
  },
  template: `
  <scene>
    <geometry geometry="PlaneGeometry" :rotation="{ x: a, y: a, z: a}" />
  </scene>
  <input style="position: fixed; top: 10px; left: 10px;" type="range" min="1" max="180" step="0.001" v-model="a" /> -->
`,
};

const app = createApp(App);
app.mount("#app");
