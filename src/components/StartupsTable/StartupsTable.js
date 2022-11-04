import React from 'react';
import { TableWrapper, DeleteButton } from '../styles';

const StartupsTable = ({ startups, handleDelete }) => {
  if (startups.length === 0) {
    return <p>No startups matched.</p>;
  }

  return (
    <section>
      <TableWrapper>
        <caption>Startups</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {startups.map((startup, index) => {
            return (
              <tr key={index}>
                <td>{startup[0]}</td>
                <td>
                  <DeleteButton onClick={() => handleDelete(index)}>
                    Delete
                  </DeleteButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
    </section>
  );
};

export default StartupsTable;
