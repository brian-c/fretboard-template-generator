import { useState } from 'react';

function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
}

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(read(key) || defaultValue);

  return [
    value,
    (newValue) => {
      write(key, newValue);
      setValue(newValue);
    }
  ];
}

export default useLocalStorage;
