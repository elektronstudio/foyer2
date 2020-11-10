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
import Settings from "./src/components/Settings.js";

import { settings, rectPoints, useUser, useUsers } from "./src/lib/index.js";

const ThreeUsers = {
  components: { ThreeGeometry },
  setup() {
    const sceneContext = inject("sceneContext");

    const user = useUser();

    settings.userColor = user.value.userColor;
    settings.userX = user.value.userX;
    settings.userY = user.value.userY;
    settings.userZ = user.value.userZ;

    const users = useUsers("foyer2", user);

    watch(
      () => users.value,
      () => sceneContext.update()
    );

    return { users };
  },
  template: `
    <three-geometry 
      v-for="user in users"
      :position="[user.userX,[user.userY - 1],user.userZ]"
      :rotation="user.userRotation"
      :color="user.userColor"
      lineColor="white"
      :width="0.5"
      :depth="0.5"
      :height="1.5"
    />
    <pre
      style="
        position: fixed;
        top: 0;
        left: 0;
        color: white;
      "
    >
 {{ JSON.stringify(users,null,1) }}
    </pre>
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
      <three-panels v-slot="{ panel }">
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
      </three-panels>
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
`,
};

const app = createApp(App);
app.mount("#app");
