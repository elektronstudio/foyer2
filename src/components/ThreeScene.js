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
  OrbitControls,
} from "../deps/three.js";

export default {
  setup() {
    const el = ref(null);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new Scene();

    const directionalLight = new DirectionalLight("white", 1);
    directionalLight.position.set(0, 0, 10);
    scene.add(directionalLight);

    const camera = new PerspectiveCamera(75, width / height, 0.1);

    camera.position.z = 5;
    camera.lookAt(0, 0, 0);

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );

    const update = () => renderer.render(scene, camera);

    provide("sceneContext", { scene });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", update);

    onMounted(() => {
      el.value.append(renderer.domElement);
      renderer.render(scene, camera);
    });

    onBeforeUpdate(() => {
      renderer.render(scene, camera);
    });

    // const animate = () => {
    //   requestAnimationFrame(animate);
    //   controls.update();
    //   renderer.render(scene, camera);
    // };

    return { el };
  },
  template: `
    <div ref="el">
      <slot />
    </div>
  `,
};
