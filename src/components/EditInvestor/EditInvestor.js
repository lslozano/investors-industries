import React from 'react';
import { useParams } from 'react-router-dom';

const EditInvestor = () => {
  const { investorName } = useParams();

  return <div>{investorName}</div>;
};

export default EditInvestor;
