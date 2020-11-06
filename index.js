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
} from "./src/lib/index.js";

const ThreeUsers = {
  components: { ThreeGeometry },
  setup() {
    const userId = useLocalstorage("ELEKTRON_USER_ID", randomId());
    const { users } = useUsers("foyer2", userId, userId);
    const avatars = computed(() =>
      users.value.map((user) => {
        user.position = [Math.random() * 5, 1, Math.random() * 5 + 2];
        return user;
      })
    );
    watchEffect(() => console.log(avatars.value));
    // return () => null;
    return { avatars };
  },
  template: `
    <three-geometry color="red" v-for="avatar in avatars" :position="avatar.position" />
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
  <!-- <div style="position: fixed; top: 0; left: 0; color: white">{{ settings.panelOffset }}</div> -->
`,
};

const app = createApp(App);
app.mount("#app");
