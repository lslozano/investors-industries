import { useState, useEffect } from 'react';

// Lazy initialization. Function will be executed the first time the component renders.
// When state is created.
export default function useStore(
  localStorage,
  sessionStorage
) {
  const [value, setValue] = useState(() => {
    // If sessionStorage is null, set store to localStorage
    return sessionStorage !== null ? sessionStorage : localStorage;
  });

  // When value is changed through setSessionStorage, it triggers the useEffect and
  // sets the new value.
  useEffect(() => {
    setValue(sessionStorage);
  }, [sessionStorage]);

  return [value, setValue];
}
