import { inject, watch } from "../deps/vue.js";
import { getRelativeLuminance } from "../deps/get-relative-luminance.js";

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
      () => users.value,
      () => {
        sceneContext.update();
      }
    );

    return { users, isLight };
  },
  template: `
    <three-group
      v-for="(user,i) in users"
      :position="[user.userX,user.userY,user.userZ]"
      :rotation="[user.userRotationX,user.userRotationY,user.userRotationZ]"
    >
      <three-geometry
        :color="user.userColor"
        lineColor="white"
        :width="0.4"
        :depth="0.4"
        :height="2"
        :castShadow="true"
      />
      <!--three-text
        :text="user.userName"
        anchorX="left"
        anchorY="middle"
        fontSize="0.18"
        :color="isLight(user.userColor || 'black') ? '#444' : '#ddd'"
        :position="[0,-0.8,0.22]"
        :rotation="[0,0,90]"
      /-->
    </three-group>
  `,
};
