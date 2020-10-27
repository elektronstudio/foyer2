import ThreeGeometry from "./ThreeGeometry.js";
import ThreeGroup from "./ThreeGroup.js";

export default {
  components: { ThreeGeometry, ThreeGroup },
  template: `
    <three-group :position="[0,-1,0]">
      <three-geometry depth="0.05" />
    </three-group>
  `,
};
