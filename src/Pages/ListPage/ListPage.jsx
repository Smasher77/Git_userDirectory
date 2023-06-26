import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import './ListPage.css';
import Search from "../../Components/Search";
import Table from "../../Components/Table";
import { fetchRepos } from "../../Services/fetchService";

const ListPage = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [totalCount, setTotalCount] = useState(0);


  const ITEMS_PER_PAGE = 10;


  useEffect(() => {
    if (query) {
      fetchRepos(query, sortOrder, ITEMS_PER_PAGE, currentPage, setRepos, setTotalCount).then((data) => {
        console.log('List page', data);
        setRepos(data.items);
        setTotalCount(data.total_count);
      });

    }

  }, [currentPage, query]);



  const handleSort = (col) => {

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

      <Search  query={query} setQuery={setQuery}  />
      <Table handleSort={handleSort} repos={repos} />

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










