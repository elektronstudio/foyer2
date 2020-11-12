import { inject, computed, watch } from "../deps/vue.js";

import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
} from "../deps/three.js";

import {
  transformProps,
  materialProps,
  watchTransform,
  watchColor,
  watchLinecolor,
} from "../lib/index.js";

export default {
  props: {
    color: {
      default: "black",
    },
  },
  setup(props) {
    watch(
      () => props.color,
      (color) => document.body.style.setProperty("background", color),
      { immediate: true }
    );

    // const sceneContext = inject("sceneContext");

    // const geometry = new SphereGeometry(100, 8, 8);

    // const material = new MeshBasicMaterial({
    //   color: props.color,
    //   side: DoubleSide,
    // });

    // const object = new Mesh(geometry, material);

    // sceneContext.scene.add(object);
    // watchColor(props, object);

    return () => null;
  },
};
