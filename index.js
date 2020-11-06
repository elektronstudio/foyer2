import { createApp, ref, watchEffect, computed } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeGroup from "./src/components/ThreeGroup.js";
import ThreeGeometry from "./src/components/ThreeGeometry.js";
import ThreeVideoHsl from "./src/components/ThreeVideoHsl.js";
import ThreeText from "./src/components/ThreeText.js";
import ThreePanels from "./src/components/ThreePanels.js";
import ThreeLine from "./src/components/ThreeLine.js";
import ThreeBackground from "./src/components/ThreeBackground.js";
import ThreeLights from "./src/components/ThreeLights.js";
import Settings from "./src/components/Settings.js";

import {
  settings,
  rectPoints,
  useLocalstorage,
  randomId,
  useUsers,
  random,
  randomint,
} from "./src/lib/index.js";

const ThreeUsers = {
  components: { ThreeGeometry },
  setup() {
    const userId = randomId();
    const user = useLocalstorage("ELEKTRON_USER", {
      userId,
      userName: userId,
      userColor: `rgb(${randomint(0, 255)},${randomint(0, 255)},${randomint(
        0,
        255
      )})`,
      userPosition: [random(0, 1), random(1, 2), random(0, 1)],
      userRotation: [random(-10, 10), random(-10, 10), random(-10, 10)],
    });
    const { users } = useUsers("foyer2", user);
    return { users };
  },
  template: `
    <three-geometry 
      v-for="user in users"
      :position="user.userPosition"
      :rotation="user.userRotation"
      :color="user.userColor"
      :width="0.5"
      :depth="0.5"
    />
  `,
};

const App = {
  components: {
    ThreeUsers,
    ThreePanels,
    ThreeGroup,
    Settings,
    ThreeScene,
    ThreeGeometry,
    ThreeVideoHsl,
    ThreeText,
    ThreeLine,
    ThreeBackground,
    ThreeLights,
  },
  setup() {
    return { settings, rectPoints };
  },
  template: `
  <three-scene>
    <three-background :color="settings.materialColor"/>
    <three-lights :color="settings.lightColor" />
    <three-geometry
      :rotation="[-90,0,0]"
      geometry="PlaneGeometry"
      width="50"
      height="50"
      :color="settings.materialColor"
      :lineColor="settings.lineColor"
    />
    <three-group :position="[0,settings.panelOffset,0]">
      <!--three-panels v-slot="{ panel }">
        <three-geometry
          geometry="PlaneGeometry"
          :width="panel.width"
          depth="0.05"
          :color="settings.materialColor"
          :lineColor="settings.lineColor"
        />
        <three-line
          :points="rectPoints(panel.width, 1)"
          :lineColor="settings.lineColor"
        />  
      </three-panels-->
      <three-text
        :position="[-1, 1.5, -1]"
        text="Live"
        anchorX="center"
        anchorY="middle"
        fontSize="1.25"
        letterSpacing="-0.01"
      />
    </three-group>
    <three-users />
  </three-scene>
  <settings />
  <!-- <div style="position: fixed; top: 0; left: 0; color: white">{{ settings.panelOffset }}</div> -->
`,
};

const app = createApp(App);
app.mount("#app");
