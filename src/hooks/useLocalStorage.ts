import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue] as [typeof value, typeof setValue];
}
    