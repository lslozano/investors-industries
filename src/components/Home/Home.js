import React from 'react';
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

const Home = ({
  investorsChangeHandler,
  startupsChangeHandler,
  dataMatched,
}) => {
  return (
    <MainWrapper>
      {dataMatched.length === 0 && (
        <FormWrapper>
          <legend id="csv-files">Add csv files</legend>
          <InputsWrapper>
            <FileInput
              text="Add your investors here"
              handleChange={investorsChangeHandler}
            />
            <FileInput
              text="Add your startups here"
              handleChange={startupsChangeHandler}
            />
          </InputsWrapper>
        </FormWrapper>
      )}
      {dataMatched.length > 0 && (
        <SectionWrapper aria-label="investors">
          <h1>All Investors</h1>
          <EditButton>
            <Link to="/edit" aria-label="Edit investors">
              Edit investors
            </Link>
          </EditButton>
          <GeneralTable data={dataMatched} />
        </SectionWrapper>
      )}
    </MainWrapper>
  );
};

export default Home;
