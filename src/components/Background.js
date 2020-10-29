import { inject, computed, watch } from "../deps/vue.js";

import {
  Group,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  DoubleSide,
} from "../deps/three.js";

import {
  transformProps,
  materialProps,
  watchTransform,
  watchColor,
  watchLinecolor,
} from "../utils/index.js";

export default {
  props: {
    ...transformProps,
    ...materialProps,
    width: {
      default: 1,
    },
    height: {
      default: 1,
    },
    depth: {
      default: 1,
    },
    geometry: {
      default: "BoxGeometry",
    },
    texture: {
      default: null,
    },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const geometry = new SphereGeometry(10000);

    const material = new MeshBasicMaterial({
      map: props.texture,
      color: props.color,
      opacity: props.opacity,
      side: DoubleSide,
    });

    const material = computed(
      () =>
        new MeshMaterial({
          map: props.texture,
          color: props.color,
          opacity: props.opacity,
          side: DoubleSide,
        })
    );

    const object = new Mesh(geometry, fillMaterial.value);

    sceneContext.scene.add(object);
    watchColor(props, object);

    return () => null;
  },
};
