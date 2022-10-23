import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InvestorTable from './components/InvestorTable';

function App() {
  const [investors, setInvestors] = useState();
  const [startups, setStartups] = useState();
  const [dataMatched, setDataMatched] = useState();

  useEffect(() => {
    if (investors && startups) {
      const investorsCopy = [...investors];

      // Loops through investorsCopy and for each element, adds industries property
      // Which will point to an array that can hold startups.
      for (let i = 0; i < investorsCopy.length; i++) {
        investorsCopy[i].startups = [];
      }

      // Loops through investors copy and startups to match investors with startups of their
      // interest
      // Since investorsCopy and startups are arrays, we need to access each element by their respective index.
      for (let i = 0; i < investorsCopy.length; i++) {
        for (let j = 0; j < startups.length; j++) {
          if (
            investorsCopy[i][1] === startups[j][1] ||
            investorsCopy[i][1] === 'any'
          ) {
            if (investorsCopy[i].startups.length < 10) {
              investorsCopy[i].startups.push(startups[j]);
            }
          }
        }
      }

      // Sets the matched investors with their startups in state
      setDataMatched(investorsCopy);
    }
  }, [investors, startups]);

  // Methods to handle change in the File Input component.
  // Helps adding investros.csv and startups.csv
  const investorsChangeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        setInvestors(results.data);
      },
    });
  };

  const startupsChangeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        setStartups(results.data);
      },
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            investorsChangeHandler={investorsChangeHandler}
            startupsChangeHandler={startupsChangeHandler}
            dataMatched={dataMatched}
          />
        }
      />
      <Route
        path="/:investorName"
        element={<InvestorTable dataMatched={dataMatched} />}
      />
    </Routes>
  );
}

export default App;
