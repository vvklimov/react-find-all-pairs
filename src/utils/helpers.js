const getStorageItem = (item) => {
  return JSON.parse(localStorage.getItem(item)) || null;
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
  return getStorageItem(name);
};

const getRandomNumber = (from, to) => Math.floor(Math.random() * to + from);

export { getStorageItem, setStorageItem, getRandomNumber };
