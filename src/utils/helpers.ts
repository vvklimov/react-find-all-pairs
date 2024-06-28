const getStorageItem = (item) => {
  return JSON.parse(localStorage.getItem(item)) || null;
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
  return getStorageItem(name);
};

const getRandomNumber = (from, to) => Math.floor(Math.random() * to + from);

const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
const timeout = async (time) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};

const getContainerData = (ref, index) => {
  const { top, left, right, bottom } = ref?.getBoundingClientRect();
  const centerY = (bottom - top) / 2 + top;
  const centerX = (right - left) / 2 + left;
  return {
    index,
    centerX,
    centerY,
    top,
    left,
    right,
    bottom,
  };
};

export {
  getStorageItem,
  setStorageItem,
  getRandomNumber,
  debounce,
  timeout,
  getContainerData,
};
