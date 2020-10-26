import { inject } from "../deps/vue.js";

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

    useThreeTransform(props, group);

    return () => null;
  },
};
