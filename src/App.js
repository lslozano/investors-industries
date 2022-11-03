import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InvestorTable from './components/InvestorTable';
import EditTable from './components/EditTable';
import EditInvestor from './components/EditInvestor';
import useLocalStorage from './hooks/useLocalStorage';
import useSessionStorage from './hooks/useSessionStorage';
import {
  mergeInvestorsStartups,
  FilesChangeHandler,
  InvestorActions,
  determineStore,
} from './utils';
import { Provider } from './Context';

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
  const fileHandler = new FilesChangeHandler();
  const investorActions = new InvestorActions();
  const { addInvestorsCSV, addStartupsCSV } = fileHandler;
  const { editInvestorName } = investorActions;

  useEffect(() => {
    if (investors && startups) {
      // Sets the matched investors with their startups in localStorage
      setLocalStorageData(mergeInvestorsStartups(investors, startups));
    }
  }, [investors, startups, setLocalStorageData]);

  // Method to delete startups of investor
  const deleteInvestorStartup = (investorName, startupIndex) => {
    let storageCopy;
    if (sessionStorageData === null) {
      storageCopy = [...localStorageData];
    } else {
      storageCopy = [...sessionStorageData];
    }

    const investorIndex = storageCopy.findIndex(
      (investor) => investor[0] === investorName
    );

    const deletedStartup = storageCopy[investorIndex][2][startupIndex];
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
    <Provider
      value={{
        store: determineStore(localStorageData, sessionStorageData),
        helpers: {
          addInvestorsCSV,
          addStartupsCSV,
          setInvestors,
          setStartups,
          editInvestorName,
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditTable />} />
        <Route
          path="/edit/:investorName"
          element={<EditInvestor onDeleteStartup={deleteInvestorStartup} />}
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
    </Provider>
  );
}

export default App;
