export const storage = (key: string, value?: any) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }
  return JSON.parse(localStorage.getItem(key)!);
};
