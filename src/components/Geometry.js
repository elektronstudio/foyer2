import { inject } from "../deps/vue.js";

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

import { useThreeTransform } from "../utils/index.js";

export default {
  props: {
    position: {
      default: { x: 0, y: 0, z: 0 },
    },
    rotation: {
      default: { x: 0, y: 0, z: 0 },
    },
    scale: {
      default: { x: 1, y: 1, z: 1 },
    },
    width: {
      default: 1,
    },
    height: {
      default: 1,
    },
    geometry: {
      default: "BoxGeometry",
    },
    fill: {
      default: "white",
    },
    stroke: {
      default: "white",
    },
    opacity: {
      default: 1,
    },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    let group = new Group();

    const geometry = new THREE[props.geometry](props.width, props.height);

    const fillMaterial = new MeshPhongMaterial({
      color: props.color,
      opacity: props.opacity,
      side: DoubleSide,
    });
    const fillObject = new Mesh(geometry, fillMaterial);
    group.add(fillObject);

    const edges = new EdgesGeometry(geometry);
    const strokeMaterial = new LineBasicMaterial({
      color: props.stroke,
      opacity: props.opacity,
      side: DoubleSide,
    });
    const strokeObject = new LineSegments(edges, strokeMaterial);
    group.add(strokeObject);

    sceneContext.scene.add(group);

    useThreeTransform(props, group);

    return () => null;
  },
};
