import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import InvestorTable from './components/InvestorTable';
import EditTable from './components/EditTable';
import EditInvestor from './components/EditInvestor';
import useLocalStorage from './hooks/useLocalStorage';
import useSessionStorage from './hooks/useSessionStorage';
import { mergeInvestorsStartups } from './utils/mergeData';

function App() {
  const [investors, setInvestors] = useState();
  const [startups, setStartups] = useState();
  const [localStorageData, setLocalStorageData] = useLocalStorage(
    'investors',
    []
  );
  const [sessionStorageData, setSessionStorageData] = useSessionStorage(
    'investors',
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (investors && startups) {
      // Sets the matched investors with their startups in localStorage
      setLocalStorageData(mergeInvestorsStartups(investors, startups));
    }
  }, [investors, startups, setLocalStorageData]);

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

  // Method to save edition on investor name
  const saveInvestorName = (investorName, newName) => {
    let storageCopy;
    if (sessionStorageData === null) {
      storageCopy = [...localStorageData]
    } else {
      storageCopy = [...sessionStorageData]
    }

    const investorIndex = storageCopy.findIndex(
      (investor) => investor[0] === investorName
    );

    storageCopy[investorIndex][0] = newName;
    setSessionStorageData(storageCopy);
    const investor = sessionStorage.getItem(newName);

    if (investor === null) {
      const deletedStartups = [];
      sessionStorage.setItem(newName, JSON.stringify(deletedStartups));
    } else {
      const deletedStartups = [...investor];
      sessionStorage.setItem(newName, JSON.stringify(deletedStartups));
    }
    navigate(`/${newName}`);
  };

  // Method to delete startups of investor
  const deleteInvestorStartup = (investorName, startupIndex) => {
    let storageCopy;
    if (sessionStorageData === null) {
      storageCopy = [...localStorageData]
    } else {
      storageCopy = [...sessionStorageData]
    }

    const investorIndex = storageCopy.findIndex(
      (investor) => investor[0] === investorName
    );

    const deletedStartup = storageCopy[investorIndex][2][startupIndex]
    storageCopy[investorIndex][2].splice(startupIndex, 1);
    setSessionStorageData(storageCopy);

    const investor = sessionStorage.getItem(investorName);

    if (investor === null) {
      const deletedStartups = [deletedStartup];
      sessionStorage.setItem(investorName, JSON.stringify(deletedStartups));
    } else {
      const pastDeletedStartups = JSON.parse(investor);
      const deletedStartups = [...pastDeletedStartups, deletedStartup];
      sessionStorage.setItem(investorName, JSON.stringify(deletedStartups));
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            investorsChangeHandler={investorsChangeHandler}
            startupsChangeHandler={startupsChangeHandler}
            data={
              sessionStorageData === null
                ? localStorageData
                : sessionStorageData
            }
          />
        }
      />
      <Route
        path="/edit"
        element={
          <EditTable
            data={
              sessionStorageData === null
                ? localStorageData
                : sessionStorageData
            }
          />
        }
      />
      <Route
        path="/edit/:investorName"
        element={
          <EditInvestor
            data={
              sessionStorageData === null
                ? localStorageData
                : sessionStorageData
            }
            onEditName={saveInvestorName}
            onDeleteStartup={deleteInvestorStartup}
          />
        }
      />
      <Route
        path="/:investorName"
        element={
          <InvestorTable
            data={
              sessionStorageData === null
                ? localStorageData
                : sessionStorageData
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
