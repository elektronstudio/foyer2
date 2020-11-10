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

import { transformProps, pointsTransforms, rectPoints } from "../lib/index.js";

import { settings } from "../lib/index.js";

export default {
  components: { ThreeGeometry, ThreeGroup, ThreeLine },
  props: {
    ...transformProps,
    height: {
      default: 4,
    },
  },
  setup(props) {
    const panels = pointsTransforms(points);
    return { panels, settings, rectPoints };
  },
  template: `
  <three-group
    :position="position"
    :rotation="rotation"
    :scale="scale"
  >
    <three-group
      :position="[0,height / 2 + 0.1,0]"
      :rotation="[180,0,0]"
      :scale="[1,height,1]"
    >
      <three-group
        v-for="panel in panels"
        :position="panel.position"
        :rotation="panel.rotation"
      >
        <slot :panel="panel" />
      </three-group>
    </three-group>
  </three-group> 
  `,
};
