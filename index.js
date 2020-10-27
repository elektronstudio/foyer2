import { createApp, ref } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";
import ThreeVideoHsl from "./src/components/ThreeVideoHsl.js";
import ThreeText from "./src/components/ThreeText.js";

import { initialSettings, settings } from "./src/settings/index.js";

const Test = {
  setup() {
    return { initialSettings, settings };
  },
  template: `
  <div
    style="
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 250px;
      overflow: auto;
      color: white;
      padding: 32px;
      background: rgba(30,30,30,0.85);
    "
  >
    <div v-for="(value, key, i) in settings">
      <div>{{ initialSettings[i].title }}: {{ settings[key] }}
      <div>
        <input
          v-model="settings[key]" 
          :type="initialSettings[i].type"
        />
      </div>
    </div>
  </div>
  `,
};

const App = {
  components: { Test, ThreeScene, ThreeGeometry, ThreeVideoHsl, ThreeText },
  setup() {
    return { settings };
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
