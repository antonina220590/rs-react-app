import { useState, useEffect } from 'react';

export const saveToLocalStorage = (searchQuery: string) => {
  localStorage.setItem('searchQuery', searchQuery);
};

export const useSearchQuery = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setSearchQuery(localStorage.getItem('searchQuery') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    saveToLocalStorage(searchQuery);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
};
