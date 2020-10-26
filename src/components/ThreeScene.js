import {
  inject,
  provide,
  ref,
  onMounted,
  onBeforeUpdate,
} from "../deps/vue.js";

import {
  Scene,
  Camera,
  PerspectiveCamera,
  Color,
  DirectionalLight,
  WebGLRenderer,
} from "../deps/three.js";

export default {
  setup() {
    const el = ref(null);
    const width = 200;
    const height = 200;

    const scene = new Scene();
    scene.background = new Color("red");

    const directionalLight = new DirectionalLight("white", 1);
    directionalLight.position.set(0, 0, 10);
    scene.add(directionalLight);

    const camera = new PerspectiveCamera(100, width / height, 0.1, 1000);
    camera.position.z = width / 2.5;

    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );

    provide("sceneContext", { scene });

    onMounted(() => {
      el.value.append(renderer.domElement);
      renderer.render(scene, camera);
    });

    onBeforeUpdate(() => {
      renderer.render(scene, camera);
    });

    return { el };
  },
  template: `
    <div ref="el">
      <slot />
    </div>
  `,
};
