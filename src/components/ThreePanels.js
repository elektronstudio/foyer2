import ThreeGeometry from "./ThreeGeometry.js";
import ThreeGroup from "./ThreeGroup.js";
import ThreeLine from "./ThreeLine.js";
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

export const rectPoints = (w = 1, h = 1) => [
  [w / -2, h / 2, 0],
  [w / 2, h / 2, 0],
  [w / 2, h / -2, 0],
  [w / -2, h / -2, 0],
  [w / -2, h / 2, 0],
];

export default {
  components: { ThreeGeometry, ThreeGroup, ThreeLine },
  setup() {
    const panels = pointsTransforms(points);
    // const texture = new TextureLoader().load(
    //   "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif"
    // );
    return { panels, settings, rectPoints };
  },
  template: `
    <three-group :position="[0,2.01,0]" :rotation="[180,0,0]">
      <three-group
        v-for="panel in panels"
        :position="panel.position"
        :rotation="panel.rotation"
      >
        <three-geometry
          geometry="PlaneGeometry"
          :width="panel.width"
          :height="4"
          depth="0.05"
          :color="settings.panelColor"
          :lineColor="settings.lineColor"
        />
        <three-line
          :points="rectPoints(panel.width, 4)"
          lineWidth="0.03" 
        />
      </three-group>
    </three-group>
  `,
};
