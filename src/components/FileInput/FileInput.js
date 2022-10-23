import React from 'react';
import { FileInputWrapper } from '../styles';

const FileInput = ({ text, handleChange }) => {
  return (
    <FileInputWrapper>
      <label htmlFor="file">{text}</label>
      <input type="file" name="file" accept=".csv" aria-label="Add csv file" onChange={handleChange} />
    </FileInputWrapper>
  );
};

export default FileInput;
