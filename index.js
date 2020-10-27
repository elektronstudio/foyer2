import { createApp, ref } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";
import ThreeVideoHsl from "./src/components/ThreeVideoHsl.js";
import ThreeText from "./src/components/ThreeText.js";

import { initialSettings, settings } from "./src/settings/index.js";

const Settings = {
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
      display: grid;
      gap: 8px;
    "
  >
    <template v-for="(value, key, i) in settings">
      <div>{{ initialSettings[i].title }}: {{ settings[key] }}</div>
      <textarea
        v-if="initialSettings[i].textarea"
        v-model="settings[key]" 
        :rows="initialSettings[i].rows || 2"
      />
      <input
        v-if="!initialSettings[i].textarea"
        v-model="settings[key]" 
        :type="initialSettings[i].type"
        :min="initialSettings[i].min || 0"
        :max="initialSettings[i].max || 100"
        :step="initialSettings[i].step || 1"
      />
    </template>
  </div>
  `,
};

const App = {
  components: { Settings, ThreeScene, ThreeGeometry, ThreeVideoHsl, ThreeText },
  setup() {
    return { settings };
  },
  template: `
  <three-scene>
    <three-video-hsl :width="3" />
    <!-- <three-text /> -->
    <!-- <three-geometry color="red" geometry="BoxGeometry" /> -->
  </three-scene>
  <settings />
`,
};

const app = createApp(App);
app.mount("#app");
