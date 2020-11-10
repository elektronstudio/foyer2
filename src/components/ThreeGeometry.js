import { inject, computed, watch } from "../deps/vue.js";

import * as THREE from "../deps/three.js";
import {
  Group,
  PlaneGeometry,
  MeshPhongMaterial,
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
} from "../lib/index.js";

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

    let group = new Group();

    const geometry = new THREE[props.geometry](
      props.width,
      props.height,
      props.depth
    );

    const fillMaterial = computed(
      () =>
        new MeshPhongMaterial({
          map: props.texture,
          color: props.color,
          opacity: props.opacity,
          side: DoubleSide,
        })
    );

    const fillObject = new Mesh(geometry, fillMaterial.value);
    watchColor(props, fillObject, sceneContext.update);

    group.add(fillObject);

    if (props.lineColor) {
      const edges = new EdgesGeometry(geometry);
      const lineMaterial = new LineBasicMaterial({
        color: props.lineColor,
        opacity: props.lineOpacity,
        side: DoubleSide,
      });
      const lineObject = new LineSegments(edges, lineMaterial);
      group.add(lineObject);
      watchLinecolor(props, lineObject);
    }

    sceneContext.scene.add(group);
    watchTransform(props, group);

    return () => null;
  },
};
