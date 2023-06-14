import React from 'react'

const Search = (props) => {

  const handleSearch = (event) => {
    event.preventDefault();
    props.setCurrentPage(props.currentPage);
    props.fetchRepos(props.query, props.sortOrder, props.ITEMS_PER_PAGE, props.currentPage, props.setRepos, props.setTotalCount);
  };



  return (
    <div>
      <h1>Github Repository Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by language, user, or name"
          value={props.query}
          onChange={(e) => props.setQuery(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Search</button>
      </form>
    </div>
  )
}

export default Search;