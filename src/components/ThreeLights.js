import { inject, watch } from "../deps/vue.js";

import { AmbientLight, PointLight, Color } from "../deps/three.js";

export default {
  props: {
    color: { default: "white" },
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const ambientLight = new AmbientLight();
    sceneContext.scene.add(ambientLight);

    const directionalLightOne = new PointLight(props.color);
    directionalLightOne.position.set(-40, 40, 40);
    sceneContext.scene.add(directionalLightOne);

    const directionalLightTwo = new PointLight(props.color);
    directionalLightTwo.position.set(40, 40, 40);
    sceneContext.scene.add(directionalLightTwo);

    watch(
      () => props.color,
      (color) => {
        console.log(color);
        directionalLightOne.color = new Color(color);
        directionalLightTwo.color = new Color(color);
      }
    );
    return () => null;
  },
};
