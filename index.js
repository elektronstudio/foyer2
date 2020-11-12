import { createApp, ref, watch, computed, inject } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGroup from "./src/components/ThreeGroup.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";
import ThreeVideoHsl from "./src/components/ThreeVideoHsl.js";
import ThreeText from "./src/components/ThreeText.js";
import ThreePanels from "./src/components/ThreePanels.js";
import ThreeLine from "./src/components/ThreeLine.js";
import ThreeBackground from "./src/components/ThreeBackground.js";
import ThreeLights from "./src/components/ThreeLights.js";
import ThreeUsers from "./src/components/ThreeUsers.js";
import Settings from "./src/components/Settings.js";
import Debug from "./src/components/Debug.js";

import { rectPoints, settings } from "./src/lib/index.js";

const App = {
  components: {
    Debug,
    Settings,
    ThreeBackground,
    ThreeGeometry,
    ThreeGroup,
    ThreeLights,
    ThreeLine,
    ThreePanels,
    ThreeScene,
    ThreeText,
    ThreeUsers,
    ThreeUsers,
    ThreeVideoHsl,
  },
  setup() {
    return { settings, rectPoints };
  },
  template: `
  <three-scene>
    <three-lights :color="settings.lightColor" />
    <three-background :color="settings.materialColor" />
    <three-geometry
      :rotation="[-90,0,0]"
      geometry="PlaneGeometry"
      width="50"
      height="50"
      :color="settings.materialColor"
      :lineColor="settings.lineColor"
      :receiveShadow="true"
    />
    <three-group :position="[0,settings.panelOffset,0]">
      <three-panels v-slot="{ panel }">
        <three-geometry
          geometry="PlaneGeometry"
          :width="panel.width"
          depth="0.05"
          :color="settings.materialColor"
          :lineColor="settings.lineColor"
          :receiveShadow="true"
        />
        <three-line
          :points="rectPoints(panel.width, 1)"
          :lineColor="settings.lineColor"
        />  
      </three-panels>
      <three-text
        :position="[-1, 1.5, -1]"
        text="elektron"
        anchorX="center"
        anchorY="middle"
        fontSize="1.25"
        letterSpacing="-0.01"
        :color="settings.lineColor"
      />
    </three-group>
    <three-users />
    <debug />
    <settings />
  </three-scene>
`,
};

const app = createApp(App);
app.mount("#app");
