export const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export const randomId = (length = 16) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  return shuffle(letters).slice(0, length).join("");
};

export const scale = (value, start1, stop1, start2, stop2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export const random = (from = 0, to = 1) => from + Math.random() * (to - from);

export const randomint = (from = 0, to = 1) => Math.floor(random(from, to));

export const upsert = (arr, callback, value) => {
  const index = arr.findIndex(callback);
  if (index > -1) {
    return arr.splice(index, 1, value);
  }
  return arr;
};

export const throttle = (fn, delay) => {
  let timeout = false;
  return (...rest) => {
    if (!timeout) {
      timeout = true;
      fn.apply(this, rest);
      setTimeout(() => {
        timeout = false;
      }, delay);
    }
  };
};

export const trunc = (value, decimals = 1) =>
  Number(Math.round(value + "e" + decimals) + "e-" + decimals);
