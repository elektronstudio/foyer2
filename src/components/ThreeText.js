import { inject, watch, onUnmounted } from "../deps/vue.js";
import { Text } from "https://cdn.skypack.dev/troika-three-text";
import { transformProps, watchTransform } from "../utils/index.js";

export default {
  props: {
    ...transformProps,
    color: { default: "white" },
    text: { default: "Hello" },
    fontSize: { default: 1 },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const object = new Text();
    sceneContext.scene.add(object);

    watch(
      () => props,
      (props) => {
        object.text = props.text;
        object.color = props.color;
        object.fontSize = props.fontSize;
        object.sync();
      },
      { immediate: true }
    );

    watchTransform(props, object);

    onUnmounted(() => {
      sceneContext.scene.remove(object);
      object.dispose();
    });

    return () => null;
  },
};
