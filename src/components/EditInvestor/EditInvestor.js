import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MainWrapper,
  SectionWrapper,
  PrimaryButton,
  EditButton,
  TableWrapper,
  DeleteButton,
  FormWrapper,
  InputsWrapper,
  PortalContent,
} from '../styles';
import { investorFilter } from '../../utils';
import { Portal } from '@reach/portal';
import Context from '../../Context';
import { useNavigate } from 'react-router-dom';

const EditInvestor = () => {
  const { store, helpers } = useContext(Context);
  const { setSessionStorageData, editInvestorName, deleteStartupFromInvestor } =
    helpers;
  const { investorName } = useParams();
  const [investorNewName, setInvestorNewName] = useState(investorName);
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();

  const filteredInvestor = investorFilter(store, investorName);
  const { name, interest, startups } = filteredInvestor[0];

  const handleInputChange = (event) => {
    const { value: newInvestorName } = event.target;
    setInvestorNewName(newInvestorName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    editInvestorName(
      investorName,
      investorNewName,
      store,
      setSessionStorageData,
      navigate
    );
  };

  const handleDelete = (startupIndex) => {
    deleteStartupFromInvestor(
      investorName,
      startupIndex,
      store,
      setSessionStorageData
    );
  };

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
          <EditButton onClick={() => setEditOpen(true)}>Edit Name</EditButton>
        </section>
        <section>
          {startups.length > 0 ? (
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
          ) : (
            <p>No startups matched.</p>
          )}
        </section>
      </SectionWrapper>
      {editOpen && (
        <Portal>
          <PortalContent>
            <div
              onClick={() => setEditOpen(false)}
              style={{ paddingLeft: '20px' }}
            >
              Close
            </div>
            <FormWrapper onSubmit={handleSubmit}>
              <legend id="investor-name">Change investor name</legend>
              <InputsWrapper>
                <input
                  type="text"
                  name="investorName"
                  aria-label="Change investor name"
                  value={investorNewName}
                  onChange={handleInputChange}
                />
              </InputsWrapper>
              <PrimaryButton type="submit">Confirm edit name</PrimaryButton>
            </FormWrapper>
          </PortalContent>
        </Portal>
      )}
    </MainWrapper>
  );
};

export default EditInvestor;
