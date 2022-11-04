import React, { useContext } from 'react';
import FileInput from '../FileInput';
import GeneralTable from '../GeneralTable';
import {
  MainWrapper,
  FormWrapper,
  InputsWrapper,
  SectionWrapper,
  EditButton,
} from '../styles';
import { Link } from 'react-router-dom';
import Context from '../../Context';

const Home = () => {
  const { store, helpers } = useContext(Context);
  const { addInvestorsCSV, addStartupsCSV, setInvestors, setStartups } =
    helpers;

  return (
    <MainWrapper>
      {store.length === 0 && (
        <FormWrapper>
          <legend id="csv-files">Add csv files</legend>
          <InputsWrapper>
            <FileInput
              text="Add your investors here"
              handleChange={(e) => addInvestorsCSV(e, setInvestors)}
            />
            <FileInput
              text="Add your startups here"
              handleChange={(e) => addStartupsCSV(e, setStartups)}
            />
          </InputsWrapper>
        </FormWrapper>
      )}
      {store.length > 0 && (
        <SectionWrapper aria-label="investors">
          <h1>All Investors</h1>
          <EditButton>
            <Link to="/edit" aria-label="Edit investors">
              Edit investors
            </Link>
          </EditButton>
          <GeneralTable store={store} />
        </SectionWrapper>
      )}
    </MainWrapper>
  );
};

export default Home;
