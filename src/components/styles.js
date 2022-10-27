import styled from 'styled-components';

export const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  max-width: 1270px;
  margin: 0 auto;
  align-items: center;
`;

export const SectionWrapper = styled.section`
  width: 100%;
`;

export const TableWrapper = styled.table`
  width: 100%;
  border-spacing: 0px 10px;

  & > caption {
    font-weight: bold;
  }

  & tr > th {
    text-align: center;
  }

  & tr > td {
    text-align: center;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;

  & a {
    text-decoration: none;
    font-weight: bold;
    color: #fff;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: #0074d9;
`;

export const EditButton = styled(Button)`
  background-color: #28a745;
`;

export const DeleteButton = styled(Button)`
  background-color: #dc3545;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-block-end: 10px;
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  max-width: 600px;

  & > #csv-files {
    font-weight: bold;
    margin: 0 auto;
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

export const FileInputWrapper = styled.div`
  width: 100%;
  border: 2px solid #0074d9;
  position: relative;
  padding: 15px;
  border-radius: 8px;

  & > label {
    position: absolute;
    top: -15px;
    left: 0;
    background-color: #f7f7f7;
    font-weight: bold;
  }

  & > input {
    width: 100%;
  }
`;


export const PortalContent = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  background-color: #f7f7f7;
`