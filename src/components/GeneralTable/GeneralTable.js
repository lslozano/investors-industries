import React from 'react';
import { Link } from 'react-router-dom';
import { TableWrapper, PrimaryButton } from '../styles'

// This table allows us to see the general data presented on main page
// And access the respective investor
const GeneralTable = ({ store }) => {
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
        {store.map((investor, index) => {
          return (
            <tr key={index}>
              <td>{investor.name}</td>
              <td>{investor.interest}</td>
              <td>
                <PrimaryButton>
                  <Link to={`/${investor.name}`} aria-label="View more information about startups linked to investor">View more</Link>
                </PrimaryButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};

export default GeneralTable;
