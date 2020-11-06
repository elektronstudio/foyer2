export const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export const randomId = (length = 16) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  return shuffle(letters).slice(0, length).join("");
};
