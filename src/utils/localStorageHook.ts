import { useState, useEffect } from 'react';
export const saveToLocalStorage = (searchQuery: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('searchQuery', searchQuery);
  }
};

export const useSearchQuery = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(searchQuery);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
};
