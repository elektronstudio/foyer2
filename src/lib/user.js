import { useLocalstorage, trunc, random, randomHexColor } from "./index.js";

export const useUser = () => {
  const user = useLocalstorage("elektron_user", {
    userId: "123",
    userName: "kika",
    userColor: randomHexColor(),
    userX: trunc(random(0, 1), 1),
    userY: trunc(random(1, 2), 1),
    userZ: trunc(random(4, 5), 1),
    userRotation: [random(-10, 10), random(-10, 10), random(-10, 10)],
  });

  return user;
};
