import { watch } from "../deps/vue.js";

export const deg2rad = (deg) => (deg * Math.PI) / 180;

export const rad2deg = (rad) => (rad * 180) / Math.PI;

export const transformProps = {
  position: {
    default: { x: 0, y: 0, z: 0 },
  },
  rotation: {
    default: { x: 0, y: 0, z: 0 },
  },
  scale: {
    default: { x: 1, y: 1, z: 1 },
  },
};

export const useThreeTransform = (props, object) => {
  watch(
    () => props.position,
    (position) => {
      object.position.x += position.x;
      object.position.y += position.y;
      object.position.z += position.z;
    },
    { immediate: true }
  );

  watch(
    () => props.rotation,
    (rotation) => {
      object.rotation.x = deg2rad(rotation.x);
      object.rotation.y = deg2rad(rotation.y);
      object.rotation.z = deg2rad(rotation.z);
    },
    { immediate: true }
  );

  watch(
    () => props.scale,
    (scale) => {
      object.scale.x *= scale.x;
      object.scale.y *= scale.y;
      object.scale.z *= scale.z;
    },
    { immediate: true }
  );
};
