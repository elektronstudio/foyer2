import { inject, watchEffect } from "../deps/vue.js";

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

export default {
  props: {
    position: {
      default: { x: 0, y: 0, z: 0 },
    },
    width: {
      default: 10,
    },
    height: {
      default: 10,
    },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    let group = new Group();

    const geometry = new PlaneGeometry(props.width, props.height);

    const fillMaterial = new MeshPhongMaterial({
      color: "green",
      opacity: 1,
      side: DoubleSide,
    });
    const fillObject = new Mesh(geometry, fillMaterial);
    group.add(fillObject);

    const edges = new EdgesGeometry(geometry);
    const strokeMaterial = new LineBasicMaterial({
      color: "blue",
      opacity: 1,
      side: DoubleSide,
    });
    const strokeObject = new LineSegments(edges, strokeMaterial);
    group.add(strokeObject);

    sceneContext.scene.add(group);

    group.position.x = props.position.x;
    group.position.y = props.position.y;
    group.position.z = props.position.z;

    return () => null;
  },
};
