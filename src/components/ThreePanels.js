import ThreeGeometry from "./ThreeGeometry.js";
import ThreeGroup from "./ThreeGroup.js";
import { TextureLoader, VideoTexture } from "../deps/three.js";

const points = [
  [-8, -8],
  [-4, -5],
  [-3, -2],
  [-4, 1],
  [-2, 4],
  [1, 4],
  [3, 1],
  [0, -1],
  [1, -3],
  [5, -5],
  [9, -6],
];

import { pointsTransforms } from "../utils/index.js";
import { settings } from "../settings/index.js";

export default {
  components: { ThreeGeometry, ThreeGroup },
  setup() {
    const panels = pointsTransforms(points);
    // const texture = new TextureLoader().load(
    //   "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif"
    // );
    return { panels, settings };
  },
  template: `
    <three-group :position="[0,2.01,0]" :rotation="[180,0,0]">
      <three-geometry
        geometry="PlaneGeometry"
        v-for="panel in panels"
        :position="panel.position"
        :rotation="panel.rotation"
        :width="panel.width"
        :height="4"
        depth="0.05"
        :color="settings.panelColor"
        :lineColor="settings.lineColor"
      />
    </three-group>
  `,
};
