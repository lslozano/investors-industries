import React from 'react';
import { TableWrapper, Button } from '../styles';
import { useParams, Link } from 'react-router-dom';

// This table allows us to see the Investor, their interest and all the industries matched to it
const InvestorTable = ({ dataMatched }) => {
  const { investorName } = useParams();
  const filteredInvestor = dataMatched.filter(
    (investor) => investor[0] === investorName
  );
  const [name, interest] = filteredInvestor[0];

  return (
    <div>
      <Button>
        <Link to="/" label="Home">
          Back
        </Link>
      </Button>
      <section>
        <h1>Investor: {name} </h1>
        <p>Interest: {interest}</p>
        <p>Startups:</p>
      </section>
      <section>
        <TableWrapper>
          <thead>
            <tr>
              <th>Name</th>
              <th>Preference</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestor[0].startups.map((startup, index) => {
              return (
                <tr key={index}>
                  <td>{startup[0]}</td>
                  <td>{startup[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </TableWrapper>
      </section>
    </div>
  );
};

export default InvestorTable;
