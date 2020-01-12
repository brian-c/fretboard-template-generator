import { useState } from 'react';

function read(key: string): any {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    // We'll use the defaults.
  }
}

function write(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // We just won't save things for next time.
  }
}

export default function useLocalStorage(key: string, defaultValue: any): [any, Function] {
  const [value, setValue] = useState(read(key) || defaultValue);

  return [
    value,
    (newValue: any): void => {
      write(key, newValue);
      setValue(newValue);
    },
  ];
};
