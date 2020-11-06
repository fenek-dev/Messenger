export const getStorageItem = (name: string) =>
  JSON.parse(localStorage.getItem(name)!);
export const setStorageItem = (name: string, value: any) =>
  localStorage.setItem(name, JSON.stringify(value));
