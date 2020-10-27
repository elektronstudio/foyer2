import { watch } from "../deps/vue.js";

export const deg2rad = (deg) => (deg * Math.PI) / 180;

export const rad2deg = (rad) => (rad * 180) / Math.PI;

export const transformProps = {
  position: {
    default: [0, 0, 0],
  },
  rotation: {
    default: [0, 0, 0],
  },
  scale: {
    default: [1, 1, 1],
  },
};

export const watchTransform = (props, object) => {
  console.log(props);
  watch(
    () => props.position,
    (position) => {
      object.position.x += position[0];
      object.position.y += position[1];
      object.position.z += position[2];
    },
    { immediate: true }
  );

  watch(
    () => props.rotation,
    (rotation) => {
      object.rotation.x = deg2rad(rotation[0]);
      object.rotation.y = deg2rad(rotation[1]);
      object.rotation.z = deg2rad(rotation[2]);
    },
    { immediate: true }
  );

  watch(
    () => props.scale,
    (scale) => {
      object.scale.x *= scale[0];
      object.scale.y *= scale[1];
      object.scale.z *= scale[2];
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
