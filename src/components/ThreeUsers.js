import getRelativeLuminance from "https://cdn.skypack.dev/get-relative-luminance";
import { inject, watch } from "../deps/vue.js";

import { useChannel } from "../lib/index.js";

import ThreeGeometry from "./ThreeGeometry.js";
import ThreeGroup from "./ThreeGroup.js";
import ThreeText from "./ThreeText.js";

const isLight = (color) => getRelativeLuminance(color) > 0.2;

export default {
  components: { ThreeGeometry, ThreeGroup, ThreeText },
  setup() {
    const sceneContext = inject("sceneContext");

    const { users } = useChannel();
    watch(
      () => users,
      () => sceneContext.update()
    );

    return { users, isLight };
  },
  template: `
    <three-group
      v-for="user in users"
      :position="[user.userX,user.userY,user.userZ]"
      :rotation="[user.userRotationX,user.userRotationY,user.userRotationZ]"
    >
      <three-geometry
        :color="user.userColor"
        lineColor="white"
        :width="0.4"
        :depth="0.4"
        :height="2"
      />
      <three-text
        :text="user.userName"
        anchorX="left"
        anchorY="middle"
        fontSize="0.18"
        :color="isLight(user.userColor || 'white') ? '#444' : '#ddd'"
        :position="[0,-0.8,0.22]"
        :rotation="[0,0,90]"
      />
    </three-group>
    <div
      style="
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        color: white;
        opacity: 0.5;
        overflow: scroll;
        pointer-events: none;
      "
    >
      <pre>{{ JSON.stringify(users,null,1) }}</pre>
    </div>
  `,
};
