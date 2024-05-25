import { Dispatch, SetStateAction, useEffect, useState } from "react";

type UseLocalStorageState<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorageState<T>(
  initialState: T,
  key: string,
): UseLocalStorageState<T> {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  return [value, setValue];
}
