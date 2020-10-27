import { createApp, ref } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";
import ThreeVideoHsl from "./src/components/ThreeVideoHsl.js";
import ThreeText from "./src/components/ThreeText.js";
import ThreePanels from "./src/components/ThreePanels.js";
import Settings from "./src/components/Settings.js";

import { settings } from "./src/settings/index.js";

const App = {
  components: {
    ThreePanels,
    Settings,
    ThreeScene,
    ThreeGeometry,
    ThreeVideoHsl,
    ThreeText,
  },
  setup() {
    return { settings };
  },
  template: `
  <three-scene>
    <!-- <three-video-hsl :width="3" /> -->
    <!-- <three-text /> -->
    <three-panels />
    <three-geometry
      :rotation="[-90,0,0]"
      geometry="PlaneGeometry"
      width="50"
      height="50"
      :color="settings.panelColor"
      :lineColor="settings.lineColor"
    />
  </three-scene>
  <settings />
  <!-- <div style="position: fixed; top: 0; left: 0; color: white">{{ settings.panelColor }}</div> -->
`,
};

const app = createApp(App);
app.mount("#app");
