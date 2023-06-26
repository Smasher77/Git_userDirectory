import React from 'react'
import { Link } from "react-router-dom";
const Table = (props) => {
  const { handleSort, repos } = props;
  return (
    <div>
      <table className="table">
        <thead>

          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th onClick={() => handleSort('owner')}>Owner</th>
            <th onClick={() => handleSort('created_at')}>Created At</th>
            <th onClick={() => handleSort('updated_at')}>Updated At</th>
            <th >View Action</th>
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
                  <Link to={`/repositories/${repo.id}`} className="lpview-link button">View</Link>
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
    </div>
  )
}

export default Table;