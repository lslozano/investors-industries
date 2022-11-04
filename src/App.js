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

const fileHandler = new FilesChangeHandler();
const investorActions = new InvestorActions()
const { addInvestorsCSV, addStartupsCSV } = fileHandler;
const { editInvestorName, deleteStartupFromInvestor } = investorActions;

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
;

  useEffect(() => {
    if (investors && startups) {
      // Sets the matched investors with their startups in localStorage
      setLocalStorageData(mergeInvestorsStartups(investors, startups));
    }
  }, [investors, startups, setLocalStorageData]);

  return (
    <Provider
      value={{
        store: determineStore(localStorageData, sessionStorageData),
        helpers: {
          addInvestorsCSV,
          addStartupsCSV,
          setInvestors,
          setStartups,
          setSessionStorageData,
          editInvestorName,
          deleteStartupFromInvestor,
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditTable />} />
        <Route path="/edit/:investorName" element={<EditInvestor />} />
        <Route path="/:investorName" element={<InvestorTable />} />
       </Routes>
    </Provider>
  );
}

export default App;
