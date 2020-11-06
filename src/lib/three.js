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
      object.position.x = parseFloat(position[0]);
      object.position.y = parseFloat(position[1]);
      object.position.z = parseFloat(position[2]);
    },
    { immediate: true }
  );

  watch(
    () => props.rotation,
    (rotation) => {
      object.rotation.x = parseFloat(deg2rad(rotation[0]));
      object.rotation.y = parseFloat(deg2rad(rotation[1]));
      object.rotation.z = parseFloat(deg2rad(rotation[2]));
    },
    { immediate: true }
  );

  watch(
    () => props.scale,
    (scale) => {
      object.scale.x = parseFloat(scale[0]);
      object.scale.y = parseFloat(scale[1]);
      object.scale.z = parseFloat(scale[2]);
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

export const watchColor = (props, object) => {
  watch(
    () => props.color,
    (color) => {
      object.material.color.set(color);
    }
  );
};

export const watchLinecolor = (props, object) => {
  watch(
    () => props.lineColor,
    (color) => {
      object.material.color.set(color);
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
