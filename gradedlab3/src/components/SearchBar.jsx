// this component is responsible for rendering a search bar that allows users to filter products based on their search query. It receives the current search query and a function to update the search query as props.
function SearchBar({ searchQuery, setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {searchQuery && (
        <button onClick={() => setSearchQuery("")}>
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;