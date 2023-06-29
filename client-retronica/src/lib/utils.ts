export const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(key, value);
  }
};
