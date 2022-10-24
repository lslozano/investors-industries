import React from 'react';
import { MainWrapper, TableWrapper, PrimaryButton, SectionWrapper } from '../styles';
import { useParams, Link } from 'react-router-dom';

// This table allows us to see the Investor, their interest and all the industries matched to it
const InvestorTable = ({ data }) => {
  const { investorName } = useParams();
  const filteredInvestor = data.filter(
    (investor) => investor[0] === investorName
  );

  const [name, interest, startups] = filteredInvestor[0];

  return (
    <MainWrapper>
      <SectionWrapper>
        <PrimaryButton>
          <Link to="/" aria-label="Home">
            Back
          </Link>
        </PrimaryButton>
        <section>
          <h1>Investor: {name} </h1>
          <p>Interest: {interest}</p>
        </section>
        <section>
        {startups.length > 0 ? (
          <TableWrapper>
            <caption>Startups</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Preference</th>
              </tr>
            </thead>
            <tbody>
              {startups.map((startup, index) => {
                return (
                  <tr key={index}>
                    <td>{startup[0]}</td>
                    <td>{startup[1]}</td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrapper>
        ) : (
          <p>No startups matched.</p>
        )}
        </section>
      </SectionWrapper>
    </MainWrapper>
  );
};

export default InvestorTable;
