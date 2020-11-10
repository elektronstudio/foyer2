import {
  useLocalstorage,
  trunc,
  random,
  randomint,
  randomHexColor,
  settings,
} from "./index.js";

export const useUser = () => {
  const user = useLocalstorage("elektron_user", {
    userId: "123",
    userName: "kika",
    userColor: randomHexColor(),
    userX: trunc(random(0, 1), 1),
    userY: trunc(random(1, 2), 1),
    userZ: trunc(random(4, 5), 1),
    userRotationX: randomint(-5, 5),
    userRotationY: 0,
    userRotationZ: 0,
  });

  settings.userColor = user.value.userColor;
  settings.userX = user.value.userX;
  settings.userY = user.value.userY;
  settings.userZ = user.value.userZ;
  settings.userRotationX = user.value.userRotationX;

  return user;
};
