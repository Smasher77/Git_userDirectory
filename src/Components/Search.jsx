import React, { useState } from 'react'

const Search = (props) => {
  const [q, setQ] = useState(props.query);

  const handleSearch = (event) => {
    event.preventDefault();
    props.setQuery(q)
  };

  return (
    <div>
      <h1>Github Repository Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by language, user, or name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Search</button>
      </form>
    </div>
  )
}

export default Search;