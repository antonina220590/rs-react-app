const URL = 'https://restcountries.com/v3.1/all';

export default async function fetchData() {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
