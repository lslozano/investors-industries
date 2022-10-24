import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableWrapper,
  PrimaryButton,
  SectionWrapper,
  MainWrapper,
} from '../styles';

// This table allows us to see the general data presented on main page
// And access the respective investor
const EditTable = ({ data }) => {
  return (
    <MainWrapper>
      <SectionWrapper aria-label="investors">
        <PrimaryButton>
          <Link to="/" aria-label="Back home">
            Back Home
          </Link>
        </PrimaryButton>
        <TableWrapper>
          <caption>Investors</caption>
          <thead>
            <tr>
              <th scope="col">Investor</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((investor, index) => {
              return (
                <tr key={index}>
                  <td>{investor[0]}</td>
                  <td>
                    <PrimaryButton>
                      <Link
                        to={`/edit/${investor[0]}`}
                        aria-label="Edit investor"
                      >
                        Edit
                      </Link>
                    </PrimaryButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TableWrapper>
      </SectionWrapper>
    </MainWrapper>
  );
};

export default EditTable;
