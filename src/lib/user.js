import { watch } from "../deps/vue.js";

import {
  useLocalstorage,
  trunc,
  random,
  randomint,
  randomHexColor,
  settings,
  randomId,
  any,
  adjectives,
  animals,
  socket,
  createMessage,
} from "./index.js";

export const useUser = () => {
  const userId = randomId();
  const userName = `${any(adjectives)} ${any(animals)}`;

  const user = useLocalstorage("elektron_user", {
    userId,
    userName,
    userColor: randomHexColor(),
    userX: trunc(random(0, 1), 1),
    userY: trunc(random(1, 2), 1),
    userZ: trunc(random(4, 5), 1),
    userRotationX: 0,
    userRotationY: 0,
    userRotationZ: 0,
  });

  settings.userName = user.value.userName;
  settings.userColor = user.value.userColor;
  settings.userX = user.value.userX;
  settings.userY = user.value.userY;
  settings.userZ = user.value.userZ;
  settings.userRotationX = user.value.userRotationX;
  settings.userRotationY = user.value.userRotationY;
  settings.userRotationZ = user.value.userRotationZ;

  watch(
    () => settings.userName,
    () => {
      socket.send(
        createMessage({
          type: "USER_UPDATE",
          userId: user.value.userId,
          userName: user.value.userName,
          value: {
            userName: user.value.userName,
          },
        })
      );
    }
  );

  return user;
};
