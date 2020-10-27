import { createApp, ref } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";
import ThreeVideoHsl from "./src/components/ThreeVideoHsl.js";
import ThreeText from "./src/components/ThreeText.js";

import { state } from "./src/settings/index.js";
state.panelOffset.value = -10;
console.log(state.panelOffset.value);

const Test = {
  setup() {
    return { ...state };
  },
  template: `
  <div style="position: fixed; top: 10px; right: 10px; color: white;">
  <input v-model="backgroundColor" type="color" />
  backgroundColor: {{ backgroundColor }}
  </div>
  `,
};
const App = {
  components: { Test, ThreeScene, ThreeGeometry, ThreeVideoHsl, ThreeText },
  setup() {
    return { ...state };
  },
  template: `
  <three-scene>
    <three-video-hsl :width="3" />
    <!-- <three-text /> -->
    <!-- <three-geometry color="red" geometry="BoxGeometry" /> -->
  </three-scene>
  <test />
`,
};

const app = createApp(App);
app.mount("#app");
