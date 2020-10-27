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
  WebGLRenderer,
  Clock,
  PCFSoftShadowMap,
  OrbitControls,
  AmbientLight,
  PointLight,
} from "../deps/three.js";

// import {
//   GlitchEffect,
//   GlitchMode,
//   EffectComposer,
//   EffectPass,
//   RenderPass,
// } from "../deps/postprocessing.js";

export default {
  setup() {
    const el = ref(null);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new Scene();
    scene.background = new Color("black");

    const ambientLight = new AmbientLight();
    scene.add(ambientLight);

    const directionalLightOne = new PointLight("white");
    directionalLightOne.position.set(-40, 40, 40);
    scene.add(directionalLightOne);

    const directionalLightTwo = new PointLight("white");
    directionalLightTwo.position.set(40, 40, 40);
    scene.add(directionalLightTwo);

    const camera = new PerspectiveCamera(75, width / height, 0.1);

    camera.position.z = 5;
    camera.lookAt(0, 0, 0);

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    // const composer = new EffectComposer(renderer);
    // composer.addPass(new RenderPass(scene, camera));
    // composer.addPass(new EffectPass(camera, new GlitchEffect()));

    // const clock = new Clock();

    //    const update = () => composer.render(clock.getDelta());

    const update = () => renderer.render(scene, camera);

    provide("sceneContext", { scene, update });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", update);

    onMounted(() => {
      el.value.append(renderer.domElement);
      update();
    });

    onBeforeUpdate(() => {
      update();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      update();
    };

    //animate();

    return { el };
  },
  template: `
    <div ref="el">
      <slot />
    </div>
  `,
};
