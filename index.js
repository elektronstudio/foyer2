import { createApp, ref } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";
import ThreeVideoHsl from "./src/components/ThreeVideoHsl.js";
import ThreeText from "./src/components/ThreeText.js";

import { initialSettings, settings } from "./src/settings/index.js";

const Test = {
  setup() {
    return { ...settings };
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
    return { ...settings };
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
