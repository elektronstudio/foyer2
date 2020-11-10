import { inject, watch } from "../deps/vue.js";

import { useUsers, chunk } from "../lib/index.js";

import ThreeGeometry from "./ThreeGeometry.js";
import ThreeGroup from "./ThreeGroup.js";
import ThreeText from "./ThreeText.js";

export default {
  components: { ThreeGeometry, ThreeGroup, ThreeText },
  setup() {
    const sceneContext = inject("sceneContext");

    const users = useUsers("foyer2");

    watch(
      () => users.value,
      () => sceneContext.update()
    );

    const formatUsername = (str) => str.slice(0, 3);
    return { users, formatUsername };
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
        :width="1"
        :depth="0.1"
        :height="1.5"
      />
      <three-text
        :text="formatUsername(user.userName)"
        anchorX="left"
        anchorY="top"
        fontSize="0.2"
        color="#ddd"
        :position="[-0.3,0.6,0.1]"
      />
    </three-group>
    <div
      style="
        position: fixed;
        top: 0;
        left: 0;
        color: white;
        opacity: 0.5;
        overflow: scroll;
        pointer-events: none;
      "
    >
      <pre>{{ JSON.stringify({},null,1) }}</pre>
    </div>
  `,
};
