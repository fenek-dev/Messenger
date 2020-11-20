export const storage = (key: string, value?: any) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }
  return JSON.parse(localStorage.getItem(key)!);
};

export const compressString = (str: string) => {
  if (str.length > 25) {
    return str.slice(0, 25) + '...';
  } else {
    return str;
  }
};
