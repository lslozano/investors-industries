import React from 'react';
import FileInput from '../FileInput';
import GeneralTable from '../GeneralTable';
import {
  MainWrapper,
  FormWrapper,
  InputsWrapper,
  SectionWrapper,
} from '../styles';

const Home = ({
  investorsChangeHandler,
  startupsChangeHandler,
  dataMatched,
}) => {
  return (
    <MainWrapper>
      {!dataMatched && (
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
      {dataMatched && (
        <SectionWrapper aria-label="investors">
          <h1>All Investors</h1>
          <GeneralTable data={dataMatched} />
        </SectionWrapper>
      )}
    </MainWrapper>
  );
};

export default Home;
