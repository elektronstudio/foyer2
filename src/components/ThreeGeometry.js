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
  watchMaterial,
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

    group.add(fillObject);

    const edges = new EdgesGeometry(geometry);
    const strokeMaterial = new LineBasicMaterial({
      color: props.lineColor,
      opacity: props.lineOpacity,
      side: DoubleSide,
    });
    const strokeObject = new LineSegments(edges, strokeMaterial);
    //group.add(strokeObject);

    sceneContext.scene.add(group);

    watchTransform(props, group);
    watchMaterial(props, group);

    return () => null;
  },
};
