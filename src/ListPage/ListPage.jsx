import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './ListPage.css';

const ListPage = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [totalCount, setTotalCount] = useState(0);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchRepos();
  }, [currentPage,query]);

  const fetchRepos = async () => {

    // let searchQuery = query;

    // Check if the query contains "lang:", "user:", or "repo:" to determine the search type
    // let searchType = 'repositories';
    //   if (searchQuery.includes('lang:')) {
    //     searchType = 'repositories';
    //   } else if (searchQuery.includes('user:')) {
    //     searchType = 'users';
    //   } else if (searchQuery.includes('repo:')) {
    //     searchType = 'repositories';
    //   }

    const response = await fetch(

      `https://api.github.com/search/repositories?q=${query}&order=${sortOrder}&per_page=${ITEMS_PER_PAGE}&page=${currentPage+1}`,
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );
    const data = await response.json();

    setRepos(data.items);
    setTotalCount(data.total_count);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    fetchRepos();
  };


  const handleSort2 = (col) => {
    
    if(col==="owner")
          {
            if(sortOrder==="ASC")
          {
            const sorted=[...repos].sort((a,b)=> 
            
              a[col].login.toLowerCase() > b[col].login.toLowerCase() ? 1 : -1);
              setRepos(sorted); 
            setSortOrder("DSC"); 
            }
    
    
    
            if(sortOrder==="DSC")
          {
            const sorted=[...repos].sort((a,b)=> 
              a[col].login.toLowerCase() < b[col].login.toLowerCase() ? 1 : -1);
              setRepos(sorted); 
            setSortOrder("ASC");
            }
          }
          else{
            if(sortOrder==="ASC")
          {
            const sorted=[...repos].sort((a,b)=> 
              a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
              setRepos(sorted); 
            setSortOrder("DSC"); 
            }
    
    
    
            if(sortOrder==="DSC")
          {
            const sorted=[...repos].sort((a,b)=> 
              a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
              setRepos(sorted); 
            setSortOrder("ASC");
            }
    
          }
    
    
          };
  

  // y

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container">
      <h1>Github Repository Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by language, user, or name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Search</button>
      </form>

      <table className="table">
        <thead>
          {/* <tr>
            <th onClick={handleSort}>Name</th>
            <th onClick={handleSort}>Description</th>
            <th onClick={handleSort}>Owner</th>
            <th onClick={handleSort}>Created At</th>
            <th onClick={handleSort}>Updated At</th>
            <th>View Action</th>
          </tr> */}
          <tr>
            <th onClick={() => handleSort2('name')}>Name</th>
            <th onClick={() => handleSort2('description')}>Description</th>
            <th onClick={() => handleSort2('owner')}>Owner</th>
            <th onClick={() => handleSort2('created_at')}>Created At</th>
            <th onClick={() => handleSort2('updated_at')}>Updated At</th>
          </tr>
          
        </thead>
        <tbody>
          {repos && repos.length > 0 ? (
            repos.map((repo) => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td>{repo.owner.login}</td>
                <td>{repo.created_at}</td>
                <td>{repo.updated_at}</td>
                <td>
                  <Link to={`/repositories/${repo.id}`} className="lpview-link">View</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No repositories found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {(repos && repos.length > 0) && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(totalCount / ITEMS_PER_PAGE)}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}

          forcePage={currentPage}
        />
      )}
    </div>
  );
};

export default ListPage;










