export const saveToLocalStorage = (searchQuery: string) => {
  localStorage.setItem('searchQuery', searchQuery);
};

export const getFromLocalStorage = () => {
  return localStorage.getItem('searchQuery');
};
