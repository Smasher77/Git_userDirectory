
// import  { useState } from "react";
// import ReactPaginate from "react-paginate";
// import './ListPage.css'
// import DetailPage from '../DetailPage/DetailPage';
// import { useNavigate, Link } from "react-router-dom";


// const ListPage = () => {
//     const [query, setQuery] = useState("as");
//     const [repos, setRepos] = useState([]);
//     const [selectedRepo, setSelectedRepo] = useState(null);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [order,setOrder]=useState("ASC");
//     const navigate = useNavigate();




//     const ITEMS_PER_PAGE = 3;
//     const offset = currentPage * ITEMS_PER_PAGE;




//     let api = `https://api.github.com/search/repositories?q=${query}`;

//     const handleSearch = async (event) => {
//       event.preventDefault();

//       const response = await fetch(api, {
//         headers: {
//           Authorization: `Bearer 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`,
//         },
//       });



//     const data = await response.json();
//       setRepos(data.items);
//       setCurrentPage(0); 





//       // reset current page to first page on search
//     };

//     const handlePageClick = ({ selected: selectedPage }) => {
//       setCurrentPage(selectedPage);
//     };

//     const handleView2 = (x) => {
//       setSelectedRepo(x);
//     };
//     const handleView = (x) => {

//       setSelectedRepo(x);

//       <DetailPage owner={x.name} repo={x}/>
//       navigate(`/details/${x.name}/${x.owner.login}/`);
//     };

//     const handleCardClose = () => {
//       setSelectedRepo(null);
//     };

//     const sorting=(col)=>{
//       if(col==="owner")
//       {
//         if(order==="ASC")
//       {
//         const sorted=[...repos].sort((a,b)=> 
//           a[col].login.toLowerCase() > b[col].login.toLowerCase() ? 1 : -1);
//           setRepos(sorted); 
//         setOrder("DSC"); 
//         }



//         if(order==="DSC")
//       {
//         const sorted=[...repos].sort((a,b)=> 
//           a[col].login.toLowerCase() < b[col].login.toLowerCase() ? 1 : -1);
//           setRepos(sorted); 
//         setOrder("ASC");
//         }
//       }
//       else{
//         if(order==="ASC")
//       {
//         const sorted=[...repos].sort((a,b)=> 
//           a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
//           setRepos(sorted); 
//         setOrder("DSC"); 
//         }



//         if(order==="DSC")
//       {
//         const sorted=[...repos].sort((a,b)=> 
//           a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
//           setRepos(sorted); 
//         setOrder("ASC");
//         }

//       }


//       }
//       const pageCount = Math.ceil(repos.length / ITEMS_PER_PAGE);




//     return (

//       <div className="container">
//         <h1>Github Directory</h1>
//         <form>
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="inp"
//           />
//           <button onClick={handleSearch}>Click!</button>

//         </form>
//         {/* {selectedRepo && (

//                 <DetailPage selectedRepo={selectedRepo} onClose={handleCardClose} />
//             )} */}
//         <table>
//           <thead>
//             <tr>
//               <th onClick={()=>sorting("name")}>Name</th>
//               <th onClick={()=>sorting("description")}>Description</th>
//               <th onClick={()=>sorting("owner")}>Owner</th>
//               <th onClick={()=>sorting("created_at")}>Created At</th>
//               <th onClick={()=>sorting("updated_at")}>Updated At</th>
//               <th >View Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {repos.slice(offset, offset + ITEMS_PER_PAGE).map((x) => (
//               <tr key={x.id}>
//                 <td>{x.name}</td>
//                 <td>{x.description}</td>
//                 <td>{x.owner.login}</td>
//                 <td>{x.created_at}</td>
//                 <td>{x.updated_at}</td>
//                 <td>
//                 {/* <Link  onClick={()=>useNavigate("/Home")}>View</Link> */}
//                   <button onClick={()=>{handleView(x);}} >View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* selectedRepo && (

//                 <DetailPage REPO={selectedRepo} OWNER={selectedRepo.owner.login} onClose={handleCardClose} />
//             ) */}



//         <ReactPaginate
//           previousLabel={"previous"}
//           nextLabel={"next"}
//           pageCount={pageCount}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//           forcePage={currentPage} // set current page to selected page on pagination click
//         />

//       </div>
//     );
// }

// export default ListPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './ListPage.css';

const ListPage = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalCount, setTotalCount] = useState(0);

  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    fetchRepos();
  }, [currentPage, sortOrder]);

  const fetchRepos = async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=updated&order=${sortOrder}&per_page=${ITEMS_PER_PAGE}&page=${currentPage}`,
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

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    fetchRepos();
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <h1>Github Repository Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by language, user, or name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("description")}>Description</th>
            <th onClick={() => handleSort("owner")}>Owner</th>
            <th onClick={() => handleSort("created_at")}>Created At</th>
            <th onClick={() => handleSort("updated_at")}>Updated At</th>
            <th>View Action</th>
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
                  <Link to={`/repositories/${repo.id}`}>View</Link>
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

      
     







