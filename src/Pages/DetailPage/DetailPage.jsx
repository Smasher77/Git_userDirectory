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
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/repositories/${repoId}`);
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
      
      
    </div>
  );
};

export default DetailPage;

