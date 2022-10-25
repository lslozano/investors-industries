import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InvestorTable from './components/InvestorTable';
import useLocalStorage from './hooks/useLocalStorage';
import { mergeInvestorsStartups } from './utils/mergeData';

function App() {
  const [investors, setInvestors] = useState();
  const [startups, setStartups] = useState();
  const [localStorageData, setLocalStorageData] = useLocalStorage('investors', []);

  useEffect(() => {
    if (investors && startups) {
      // Sets the matched investors with their startups in localStorage
      setLocalStorageData(mergeInvestorsStartups(investors, startups));
    }
  }, [investors, startups, setLocalStorageData]);

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
            dataMatched={localStorageData}
          />
        }
      />
      <Route
        path="/:investorName"
        element={<InvestorTable dataMatched={localStorageData} />}
      />
    </Routes>
  );
}

export default App;
