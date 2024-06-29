import { BestTimeLocalStorageFormat, Settings } from "./types";

const getStorageItem = (item: string) => {
  const storageItem = localStorage.getItem(item);
  return storageItem ? JSON.parse(storageItem) : null;
};

const setStorageItem = (
  itemName: string,
  value: BestTimeLocalStorageFormat | Settings
) => {
  localStorage.setItem(itemName, JSON.stringify(value));
  return getStorageItem(itemName);
};

const getRandomNumber = (from: number, to: number) =>
  Math.floor(Math.random() * to + from);

function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: T): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
const timeout = async (time: number) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};

const getContainerData = (ref: HTMLElement, index: number) => {
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
