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

export const watchTransfrom = (props, object) => {
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

export const materialProps = {
  color: {
    default: "black",
  },
  lineColor: {
    default: "white",
  },
  opacity: {
    default: 1,
  },
  lineOpacity: {
    default: 1,
  },
};

export const watchMaterial = (props, object) => {
  watch(
    () => props.color,
    (color) => {
      object.children[0].material.color.set(color);
    }
  );
  watch(
    () => props.opacity,
    (opacity) => {
      object.children[0].material.opacity.set(opacity);
    }
  );
  watch(
    () => props.lineColor,
    (lineColor) => {
      object.children[1].material.color.set(lineColor);
    }
  );
  watch(
    () => props.lineOpacity,
    (lineOpacity) => {
      object.children[1].material.opacity.set(opacity);
    }
  );
};
