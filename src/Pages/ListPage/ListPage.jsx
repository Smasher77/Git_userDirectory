import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import './ListPage.css';
import Search from "../../Components/Search";
import Table from "../../Components/Table";
import fetchRepos from "../../Services/fetchService";

//main


const ListPage = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [totalCount, setTotalCount] = useState(0);


  const ITEMS_PER_PAGE = 10;


  useEffect(() => {
    if (query) {
      const data = fetchRepos(query, sortOrder, ITEMS_PER_PAGE, currentPage, setRepos, setTotalCount);
      setRepos(data.items);
      setTotalCount(data.total_count);
    }

  }, [currentPage]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchRepos(query, sortOrder, ITEMS_PER_PAGE, currentPage);
  //       setRepos(data.items);
  //       setTotalCount(data.total_count);
  //     } catch (error) {
  //       throw new Error('Error');
  //     }
  //   };

  //   fetchData();
  // }, [currentPage]);

  // const fetchRepos = async () => {

  //   const response = await fetch(

  //     `${process.env.REACT_APP_BASE_URL}/search/repositories?q=${query}&order=${sortOrder}&per_page=${ITEMS_PER_PAGE}&page=${currentPage + 1}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  //       },
  //     }
  //   );
  //   const data = await response.json();



  //   setRepos(data.items);
  //   setTotalCount(data.total_count);
  // };

  const handleSort2 = (col) => {

    if (!col) {
      return;
    }

    if (col === "owner") {
      if (sortOrder === "ASC") {
        const sorted = [...repos].sort((a, b) =>
          a[col]?.login?.toLowerCase() > b[col]?.login?.toLowerCase() ? 1 : -1
        );
        setRepos(sorted);
        setSortOrder("DESC");
      }

      if (sortOrder === "DESC") {
        const sorted = [...repos].sort((a, b) =>
          a[col]?.login?.toLowerCase() < b[col]?.login?.toLowerCase() ? 1 : -1
        );
        setRepos(sorted);
        setSortOrder("ASC");
      }
    } else {
      if (sortOrder === "ASC") {
        const sorted = [...repos].sort((a, b) =>
          a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
        );
        setRepos(sorted);
        setSortOrder("DESC");
      }

      if (sortOrder === "DESC") {
        const sorted = [...repos].sort((a, b) =>
          a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1
        );
        setRepos(sorted);
        setSortOrder("ASC");
      }
    }
  };


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container">

      <Search sortOrder={sortOrder} ITEMS_PER_PAGE={ITEMS_PER_PAGE} fetchRepos={fetchRepos} query={query} currentPage={currentPage} setCurrentPage={setCurrentPage} setQuery={setQuery} setTotalCount={setTotalCount} setRepos={setRepos} />
      <Table handleSort2={handleSort2} repos={repos} />

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









