import React from 'react';
import styled from 'styled-components';

const FileInput = ({ text, handleChange }) => {
  return (
    <Wrapper>
      <label htmlFor="file">{text}</label>
      <input type="file" name="file" accept=".csv" onChange={handleChange} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default FileInput;
