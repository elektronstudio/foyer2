import { inject, watch, provide } from "../deps/vue.js";
import { Group } from "../deps/three.js";

import { transformProps, watchTransform } from "../utils/index.js";

export default {
  props: { ...transformProps },
  setup(props, { slots }) {
    const sceneContext = inject("sceneContext");
    watch(
      () => slots.default(),
      (_) => {
        sceneContext.update();
      },
      { immediate: true }
    );
    const group = new Group();
    sceneContext.scene.add(group);

    provide("sceneContext", { ...sceneContext, scene: group });
    watchTransform(props, group);

    return () => slots.default();
  },
};
