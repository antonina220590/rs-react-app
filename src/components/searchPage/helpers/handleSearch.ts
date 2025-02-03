export default function handleSearch(
  newSearchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
) {
  setSearchQuery(newSearchQuery);
}
