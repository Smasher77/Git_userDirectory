import React from 'react'
import { Link } from "react-router-dom";
const Table = (props) => {
  return (
    <div>
        <table className="table">
        <thead>

          <tr>
            <th onClick={() => props.handleSort2('name')}>Name</th>
            <th onClick={() => props.handleSort2('description')}>Description</th>
            <th onClick={() => props.handleSort2('owner')}>Owner</th>
            <th onClick={() => props.handleSort2('created_at')}>Created At</th>
            <th onClick={() => props.handleSort2('updated_at')}>Updated At</th>
            <th >View Action</th>
          </tr>

        </thead>
        <tbody>
          {props.repos && props.repos.length > 0 ? (
            props.repos.map((repo) => (
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