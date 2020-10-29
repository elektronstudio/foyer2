import { inject } from "../deps/vue.js";

import {
  BufferGeometry,
  Vector3,
  LineBasicMaterial,
  Line,
} from "../deps/three.js";

import { transformProps, watchTransform } from "../utils/index.js";

export default {
  props: {
    ...transformProps,
    points: { default: [] },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const geometry = new BufferGeometry().setFromPoints(
      props.points.map((point) => new Vector3(...point))
    );
    const material = new LineBasicMaterial({
      color: "red",
      linewidth: 10,
    });
    const object = new Line(geometry, material);

    sceneContext.scene.add(object);

    watchTransform(props, object);

    return () => null;
  },
};
