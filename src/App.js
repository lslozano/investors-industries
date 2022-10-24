import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InvestorTable from './components/InvestorTable';
import EditTable from './components/EditTable';
import EditInvestor from './components/EditInvestor';
import useLocalStorage from './hooks/useLocalStorage';
import { mergeInvestorsStartups } from './utils/mergeData';

function App() {
  const [investors, setInvestors] = useState();
  const [startups, setStartups] = useState();
  const [dataMatched, setDataMatched] = useLocalStorage('investors', []);

  useEffect(() => {
    if (investors && startups) {
      // Sets the matched investors with their startups in localStorage
      setDataMatched(mergeInvestorsStartups(investors, startups));
    }
  }, [investors, startups, setDataMatched]);

  // Methods to handle change in the File Input component.
  // Helps adding investors.csv and startups.csv
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
      <Route path="/edit" element={<EditTable data={dataMatched} />} />
      <Route
        path="/edit/:investorName"
        element={<EditInvestor data={dataMatched} />}
      />
      <Route
        path="/:investorName"
        element={<InvestorTable data={dataMatched} />}
      />
    </Routes>
  );
}

export default App;
