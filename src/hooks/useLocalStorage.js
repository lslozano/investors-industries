import { useState, useEffect } from 'react';

// Lazy initialization. Function will be executed the first time the component renders.
// When state is created.
export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const savedData = localStorage.getItem(key);

    // If savedData at key location is not null, it returns that data parsed as JSON.}
    // If not, it returns the passed default value.
    return savedData !== null
    ? JSON.parse(savedData)
    : defaultValue
  });

  // When value is changed through setValue fn, it triggers the useEffect and
  // sets the value at key location.
  useEffect(() => {
    const stringData = JSON.stringify(value);
    localStorage.setItem(key, stringData);
  }, [key, value]);

  return [value, setValue];
};