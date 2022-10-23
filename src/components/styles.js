import styled from 'styled-components';

export const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  max-width: 1270px;
  margin: 0 auto;
`;

export const TableWrapper = styled.table`
  width: 100%;
  border-spacing: 0px 10px;

  & tr > th {
    text-align: center;
  }

  & tr > td {
    text-align: center;
  }
`;

export const Button = styled.button`
  border: none;
  border-radius: 4px;
  background-color: #0074d9;
  cursor: pointer;

  & a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
`;
