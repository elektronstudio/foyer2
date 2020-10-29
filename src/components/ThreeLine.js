import { inject } from "../deps/vue.js";

import {
  BufferGeometry,
  Vector3,
  LineBasicMaterial,
  Line,
  DoubleSide,
  Vector2,
  Mesh,
  MeshLine,
  MeshLineMaterial,
  MeshLineRaycast,
} from "../deps/three.js";

import { transformProps, watchTransform } from "../utils/index.js";

export default {
  props: {
    ...transformProps,
    points: { default: [] },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    /*
    const geometry = new BufferGeometry().setFromPoints(
      props.points.map((point) => new Vector3(...point))
    );
    const material = new LineBasicMaterial({
      color: "red",
      linewidth: 1000,
    });
    const object = new Line(geometry, material);

    sceneContext.scene.add(object);
    */

    const geometry = new MeshLine();
    geometry.setGeometry(props.points.flat());

    const material = new MeshLineMaterial({
      color: "white",
      lineWidth: 0.2,
      sizeAttenuation: 1,
      resolution: new Vector2(window.innerWidth, window.innerHeight),
      side: DoubleSide,
    });

    const object = new Mesh(geometry, material);
    object.raycast = MeshLineRaycast;

    sceneContext.scene.add(object);

    watchTransform(props, object);

    return () => null;
  },
};
