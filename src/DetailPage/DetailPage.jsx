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
      <h1 className="detail-title">Details of {repo.full_name}</h1>
      <img className="detail-avatar" src={repo.owner.avatar_url} alt="Avatar" />
      <p className="detail-description">Description: `<br/>{repo.description}</p>
      <p className="detail-info">Owner: {repo.owner.login}</p>
      <p className="detail-info">Created At: {repo.created_at}</p>
      <p className="detail-info">Updated At: {repo.updated_at}</p>
      
      <a className="detail-link" href={repo.html_url} target="_blank" rel="noopener noreferrer">

        View on GitHub
      </a>
      
      {/* {
        
      ,
      "node_id": "MDEwOlJlcG9zaXRvcnkzMDgxMjg2",
      "name": "Tetris",
      "full_name": "dtrupenn/Tetris",
      "owner": {
        "login": "dtrupenn",
        "id": 872147,
        "node_id": "MDQ6VXNlcjg3MjE0Nw==",
        "avatar_url": "https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
        "gravatar_id": "",
        "url": "https://api.github.com/users/dtrupenn",
        "received_events_url": "https://api.github.com/users/dtrupenn/received_events",
        "type": "User",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "site_admin": true
      } */}
    </div>
  );
};

export default DetailPage;

