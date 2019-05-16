import { useState } from 'react';

function read(key: string): any {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
}

function write(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
}

function useLocalStorage(key: string, defaultValue: any): [any, Function] {
  const [value, setValue] = useState(read(key) || defaultValue);

  return [
    value,
    (newValue: any): void => {
      write(key, newValue);
      setValue(newValue);
    },
  ];
}

export default useLocalStorage;
