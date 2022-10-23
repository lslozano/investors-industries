import React from 'react';
import styled from 'styled-components';
import FileInput from '../FileInput';
import GeneralTable from '../GeneralTable';

const Home = ({
  investors,
  startups,
  investorsChangeHandler,
  startupsChangeHandler,
  dataMatched,
}) => {
  return (
    <div>
      {(!investors || !startups) && (
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
      )}
      {dataMatched && (
        <section>
          <h1>Investors matched with Startups</h1>
          <GeneralTable data={dataMatched} />
        </section>
      )}
    </div>
  );
};

const InputsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-content: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  max-width: 600px;
  align-items: center;
  margin: 0 auto;
`;

export default Home;
