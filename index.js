import { createApp, ref } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGroup from "./src/components/ThreeGroup.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";
import ThreeVideoHsl from "./src/components/ThreeVideoHsl.js";
import ThreeText from "./src/components/ThreeText.js";
import ThreePanels from "./src/components/ThreePanels.js";
import ThreeLine from "./src/components/ThreeLine.js";
import Settings from "./src/components/Settings.js";

import { settings } from "./src/settings/index.js";

const App = {
  components: {
    ThreePanels,
    ThreeGroup,
    Settings,
    ThreeScene,
    ThreeGeometry,
    ThreeVideoHsl,
    ThreeText,
    ThreeLine,
  },
  setup() {
    return { settings };
  },
  template: `
  <three-scene>
    <three-geometry
      :rotation="[-90,0,0]"
      geometry="PlaneGeometry"
      width="50"
      height="50"
      :color="settings.panelColor"
      :lineColor="settings.lineColor"
    />
    <three-group :position="[0,settings.panelOffset,0]">
      <three-panels />
      <three-text
        :position="[-1, 1.5, -1]"
        text="Live"
        anchorX="center"
        anchorY="middle"
        fontSize="1.25"
        letterSpacing="-0.01"
      />
    </three-group>
  </three-scene>
  <settings />
  <!-- <div style="position: fixed; top: 0; left: 0; color: white">{{ settings.panelOffset }}</div> -->
`,
};

const app = createApp(App);
app.mount("#app");
