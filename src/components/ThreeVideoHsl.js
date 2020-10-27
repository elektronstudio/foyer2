import { inject, watch } from "../deps/vue.js";
import { Hls } from "../deps/hls.js";
import { watchTransform } from "../utils/index.js";

import {
  PlaneGeometry,
  VideoTexture,
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
} from "../deps/three.js";

export default {
  props: { width: { default: 1 } },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const url =
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

    const video = document.createElement("video");
    video.loop = true;
    video.autoplay = true;
    video.playsinline = true;
    video.crossOrigin = "anonymous";
    video.muted = true;
    //video.style = "display: none";

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.onerror = (e) => {
        video.src = url;
      };
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        manifestLoadingRetryDelay: 5000,
        manifestLoadingMaxRetry: Infinity,
      });
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(url);
      });
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }

    const geometry = new PlaneGeometry(props.width, (9 / 16) * props.width);

    const map = new VideoTexture(video);

    const material = new MeshBasicMaterial({
      map,
      color: "white",
      side: DoubleSide,
    });

    const object = new Mesh(geometry, material);

    sceneContext.scene.add(object);

    // watchTransform(props, object);

    return () => null;
  },
};
