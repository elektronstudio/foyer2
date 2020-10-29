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
    default: null,
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

export const pointsMidpoint = ([x1, y1], [x2, y2]) => [
  (x1 + x2) / 2,
  (y1 + y2) / 2,
];

export const pointsAngle = ([x1, y1], [x2, y2]) =>
  -Math.atan2(y2 - y1, x2 - x1);

export const pointsDistance = ([x1, y1], [x2, y2]) =>
  Math.hypot(x2 - x1, y2 - y1);

export const pointsTransforms = (points) => {
  let transforms = [];
  points.forEach((p, i) => {
    if (!!points[i + 1]) {
      transforms.push({
        position: [
          pointsMidpoint(points[i], points[i + 1])[0],
          0,
          pointsMidpoint(points[i], points[i + 1])[1],
        ],
        rotation: [0, rad2deg(pointsAngle(points[i], points[i + 1])), 0],
        width: pointsDistance(points[i], points[i + 1]),
      });
    }
  });
  return transforms;
};

export const rectPoints = (w = 1, h = 1) => [
  [w / -2, h / 2, 0],
  [w / 2, h / 2, 0],
  [w / 2, h / -2, 0],
  [w / -2, h / -2, 0],
  [w / -2, h / 2, 0],
];
