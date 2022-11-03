import React from 'react';
import {
  MainWrapper,
  TableWrapper,
  PrimaryButton,
  SectionWrapper,
  EditButton,
  ButtonsContainer,
} from '../styles';
import { useParams, Link } from 'react-router-dom';
import { investorFilter } from '../../utils';

// This table allows us to see the Investor, their interest and all the industries matched to it
const InvestorTable = ({ data }) => {
  const { investorName } = useParams();
  const filteredInvestor = investorFilter(data, investorName);

  const [name, interest, startups] = filteredInvestor[0];

  return (
    <MainWrapper>
      <SectionWrapper>
        <ButtonsContainer>
          <PrimaryButton>
            <Link to="/" aria-label="Home">
              Back
            </Link>
          </PrimaryButton>
          <EditButton>
            <Link to={`/edit/${investorName}`} aria-label="Edit investor">
              Edit investor
            </Link>
          </EditButton>
        </ButtonsContainer>
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
