import { inject, watch, onUnmounted, computed } from "../deps/vue.js";
import { Text } from "https://cdn.skypack.dev/troika-three-text";
import { transformProps, watchTransform } from "../lib/index.js";

export default {
  props: {
    ...transformProps,
    color: { default: "white" },
    text: { default: "" },
    fontFile: { default: null },
    fontSize: { default: 1 },
    fontWeight: { default: "normal" },
    anchorX: { default: "left" },
    anchorY: { default: "top" },
    letterSpacing: { default: 0 },
    castShadow: {
      default: false,
    },
    receiveShadow: {
      default: false,
    },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const font = computed(() => {
      if (props.fontFile) {
        return props.fontFile;
      }
      if (props.fontWeight === "bold") {
        return "../../public/font-bold.woff";
      }
      return "../../public/font-medium.woff";
    });

    const object = new Text();
    object.castShadow = props.castShadow;
    object.receiveShadow = props.receiveShadow;

    sceneContext.scene.add(object);

    watch(
      props,
      () => {
        object.font = font.value;
        object.fontWeight = props.fontWeight;
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
