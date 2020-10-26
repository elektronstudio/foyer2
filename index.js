/*
import {
  VScene,
  visualia,
} from "https://visualia.github.io/visualia/dist/visualia.js";

import {
  createApp,
  ref,
  onMounted,
} from "http://visualia.github.io/visualia/dist/deps/vue.js";

const App = {
  components: { VScene },
  template: `
    <v-scene mode="webgl" width="600" height="400">
      <v-circle position="100 100" />
    </v-scene>
  `,
};

//createApp(App).mount("#app");

visualia({ template: App.template });
*/

import { createApp } from "./src/deps/vue.js";
import ThreeScene from "./src/components/ThreeScene.js";
import ThreeRect from "./src/components/ThreeRect.js";

const App = {
  components: { ThreeScene, ThreeRect },
  template: `
  <three-scene>
    <three-rect />
  </three-scene>
`,
};

const app = createApp(App);
app.mount("#app");
