import { inject, watch } from "../deps/vue.js";

import { useUser, useUsers } from "../lib/index.js";

import ThreeGeometry from "./ThreeGeometry.js";

export default {
  components: { ThreeGeometry },
  setup() {
    const sceneContext = inject("sceneContext");

    const user = useUser();

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
      :position="[user.userX,user.userY,user.userZ]"
      :rotation="[user.userRotationX,user.userRotationY,user.userRotationZ]"
      :color="user.userColor"
      lineColor="white"
      :width="0.5"
      :depth="0.5"
      :height="1.5"
    />
    <pre
      style="
        position: fixed;
        bottom: 0;
        left: 0;
        color: white;
        opacity: 0.2
      "
    >
 {{ JSON.stringify(users,null,1) }}
    </pre>
  `,
};
