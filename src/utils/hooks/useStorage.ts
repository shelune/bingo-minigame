import { useCallback, useEffect, useState } from "react";

type UseStorageReturn<D> = {
  storedValue: D | null;
  setValue: (value: D) => void;
  clearKey: () => void;
};
export const useStorage = <D = Record<string, string | number>>(
  key: string
): UseStorageReturn<D> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as D) : null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error when reading local storage");
      return null;
    }
  }, [key]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (value: D) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("error when setting local storage");
      }
    },
    [key]
  );

  const clearKey = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error when clearing local storage");
    }
  }, [key]);

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener("local-storage", handleStorageChange);

    return () => {
      window.removeEventListener("local-storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    storedValue,
    setValue,
    clearKey,
  };
};
