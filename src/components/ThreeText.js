import { inject, watch, onUnmounted } from "../deps/vue.js";
import { Text } from "https://cdn.skypack.dev/troika-three-text";
import { transformProps, watchTransform } from "../lib/index.js";

export default {
  props: {
    ...transformProps,
    color: { default: "white" },
    text: { default: "Hello" },
    fontSize: { default: 1 },
    anchorX: { default: "left" },
    anchorY: { default: "top" },
    letterSpacing: { default: 0 },
    font: { default: "../../public/font-bold.woff" },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const object = new Text();
    sceneContext.scene.add(object);

    watch(
      () => props,
      (props) => {
        object.font = props.font;
        object.text = props.text;
        object.color = props.color;
        object.fontSize = props.fontSize;
        object.anchorX = props.anchorX;
        object.anchorY = props.anchorY;
        object.letterSpacing = props.letterSpacing;
        object.sync();
      },
      { immediate: true }
    );

    object.addEventListener("synccomplete", () => {
      sceneContext.update();
    });

    watchTransform(props, object);

    onUnmounted(() => {
      sceneContext.scene.remove(object);
      object.dispose();
    });

    return () => null;
  },
};
