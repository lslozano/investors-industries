import React from 'react';
import { Link } from 'react-router-dom';
import { TableWrapper, Button } from '../styles'

// This table allows us to see the general data presented on main page
// And access the respective investor
const GeneralTable = ({ data }) => {
  return (
    <TableWrapper>
      <caption>Investors</caption>
      <thead>
        <tr>
          <th scope="col">Investor</th>
          <th scope="col">Preference</th>
          <th scope="col">Startups</th>
        </tr>
      </thead>
      <tbody>
        {data.map((investor, index) => {
          return (
            <tr key={index}>
              <td>{investor[0]}</td>
              <td>{investor[1]}</td>
              <td>
                <Button>
                  <Link to={`/${investor[0]}`} aria-label="View more information about startups linked to investor">View more</Link>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};

export default GeneralTable;
