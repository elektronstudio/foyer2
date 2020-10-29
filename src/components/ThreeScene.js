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
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  Vector2,
} from "../deps/three.js";

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

    camera.position.y = 1;
    camera.position.z = 10;
    camera.lookAt(0, 1, 0);

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom
    /// resolution, strength, radius, threshold;
    composer.addPass(
      new UnrealBloomPass(
        new Vector2(window.innerWidth / 10, window.innerHeight / 10),
        1,
        2,
        0.5
      )
    );

    const update = () => composer.render();

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
