// // Octokit.js
// // https://github.com/octokit/core.js#readme

// import {React, useEffect,useState} from 'react'
// import { useSearchParams } from 'react-router-dom';
// import { useLocation } from "react-router-dom";

// const DetailPage = ({owner, repo}) => {

  
  
  

//   let [fetchedData, updateFetchedData] = useState([]);

//   let api = ` https://api.github.com/repos/${owner}/${repo}`;
  
//    useEffect(() => {
      
//         (async function () {
//             let data = await fetch(api).then((res) => res.json());
//             updateFetchedData(data);
//         })();
//     }, [api]);

    
  
      
  
//     return(
//       <div>
        
//         <h1>{fetchedData?.name}</h1>
//         <p>{fetchedData?.description}</p>
//       </div>
//     );
      
  
      
  
      
      
//       // reset current page to first page on search
//     };

  
// export default DetailPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DetailPage.css';

const DetailPage = () => {
  const { repoId } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetchRepoDetails();
  }, []);

  const fetchRepoDetails = async () => {
    const response = await fetch(`https://api.github.com/repositories/${repoId}`);
    const data = await response.json();
    setRepo(data);
  };

  if (!repo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <h1 className="detail-title">Details of {repo.name}</h1>
      <img className="detail-avatar" src={repo.owner.avatar_url} alt="Avatar" />
      <p className="detail-description">Description: `<br/>{repo.description}</p>
      <p className="detail-info">Owner: {repo.owner.login}</p>
      <p className="detail-info">Created At: {repo.created_at}</p>
      <p className="detail-info">Updated At: {repo.updated_at}</p>
      <a className="detail-link" href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default DetailPage;

