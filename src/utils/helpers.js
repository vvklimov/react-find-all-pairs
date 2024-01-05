const getStorageItem = (item) => {
  return JSON.parse(localStorage.getItem(item)) || null;
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
  return getStorageItem(name);
};

export { getStorageItem, setStorageItem };
