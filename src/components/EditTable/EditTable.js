import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  TableWrapper,
  PrimaryButton,
  EditButton,
  SectionWrapper,
  MainWrapper,
} from '../styles';
import Context from '../../Context';

// This table allows us to see the general data presented on main page
// And access the respective investor
const EditTable = () => {
  const { store } = useContext(Context);

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
            {store.map((investor, index) => {
              return (
                <tr key={index}>
                  <td>{investor.name}</td>
                  <td>
                    <EditButton>
                      <Link
                        to={`/edit/${investor.name}`}
                        aria-label="Edit investor"
                      >
                        Edit
                      </Link>
                    </EditButton>
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
