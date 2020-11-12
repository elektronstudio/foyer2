import { inject, watch } from "../deps/vue.js";

import {
  AmbientLight,
  PointLight,
  Color,
  CameraHelper,
} from "../deps/three.js";

export default {
  props: {
    color: { default: "white" },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const ambientLight = new AmbientLight();
    sceneContext.scene.add(ambientLight);

    const directionalLight = new PointLight(props.color);
    directionalLight.position.set(0, 100, 40);
    directionalLight.castShadow = true;
    sceneContext.scene.add(directionalLight);

    // const helper = new CameraHelper(directionalLight.shadow.camera);
    // sceneContext.scene.add(helper);

    watch(
      () => props.color,
      (color) => {
        directionalLight.color = new Color(color);
      }
    );
    return () => null;
  },
};
