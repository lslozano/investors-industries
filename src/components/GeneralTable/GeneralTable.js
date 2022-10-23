import React from 'react';
import { Link } from 'react-router-dom';
import { TableWrapper, Button } from '../styles'

// This table allows us to see the general data presented on main page
// And access the respective investor
const GeneralTable = ({ data }) => {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>Investor</th>
          <th>Preference</th>
          <th>Startups</th>
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
                  <Link to={`/${investor[0]}`} label="Investor Startups">View more</Link>
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
