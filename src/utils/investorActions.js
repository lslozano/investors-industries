// Startups Types
const startupTypes = ['any', 'bio', 'internet', 'environment'];

function generateRandomStartup() {
  const startupIdentifier = `ynd_${Math.ceil(Math.random() * 10000)}`;
  const startupType =
    startupTypes[Math.floor(Math.random() * startupTypes.length)];
  const newStartup = [startupIdentifier, startupType];
  return newStartup;
}

// Class that helps us handle Investor Actions - CRUD
export default class InvestorActions {
  // Edits name of investor
  editInvestorName(
    investorName,
    newName,
    store,
    setSessionStorageData,
    navigate
  ) {
    let storageCopy = [...store];

    const investorIndex = storageCopy.findIndex(
      (investor) => investor.name === investorName
    );

    storageCopy[investorIndex].name = newName;
    setSessionStorageData(storageCopy);
    const investor = JSON.parse(sessionStorage.getItem(investorName));
    const newInvestorName = sessionStorage.getItem(newName);

    if (newInvestorName === null) {
      const deletedStartups =
        investor !== null && investor.length > 0 ? [...investor] : [];
      sessionStorage.setItem(newName, JSON.stringify(deletedStartups));
      sessionStorage.removeItem(investorName);
    } else {
      const deletedStartups = [...investor];
      sessionStorage.setItem(newName, JSON.stringify(deletedStartups));
    }
    navigate(`/${newName}`);
  }

  // Deletes specific startup from investor
  deleteStartupFromInvestor(
    investorName,
    startupIndex,
    store,
    setSessionStorageData
  ) {
    let storageCopy = [...store];

    // Get investor index
    const investorIndex = storageCopy.findIndex(
      (investor) => investor.name === investorName
    );

    // Get hold of the startups of that investor
    const { startups } = storageCopy[investorIndex];

    // Get hold of the startup to be deleted
    const deletedStartup = startups[startupIndex];
    // Proceed to delete startup
    storageCopy[investorIndex].startups.splice(startupIndex, 1);
    // Update session storage
    setSessionStorageData(storageCopy);

    // Get investor record from session storage
    const investor = sessionStorage.getItem(investorName);

    // If null, investor hadn't previously deleted startups
    if (investor === null) {
      // Set the deleted startups to the recently deleted startup
      const deletedStartups = [deletedStartup];
      // Update session storage with the investor and the record of the deleted startup
      sessionStorage.setItem(investorName, JSON.stringify(deletedStartups));
    } else {
      // Get hold of the previously deleted startups
      const pastDeletedStartups = JSON.parse(investor);
      // Update deleted startups
      const deletedStartups = [...pastDeletedStartups, deletedStartup];
      // Update session storage with the record of all deleted startups
      sessionStorage.setItem(investorName, JSON.stringify(deletedStartups));
    }
  }

  addStartup(investorName, store, setSessionStorageData) {
    let storageCopy = [...store];
    // Get hold of inverstor index
    const investorIndex = storageCopy.findIndex(
      (investor) => investor.name === investorName
    );

    // Get hold of the startups matched with the investor
    const { startups } = storageCopy[investorIndex];

    // If startups are more or equal than 10, do nothing.
    if (startups.length >= 10) return;

    // If investor has less than 10, we can add a startup
    const investor = sessionStorage.getItem(investorName);

    // If investor didn't have a previosly deleted startup, push a new one.
    if (investor === null) {
      startups.push(generateRandomStartup());

      // Update session storage.
      storageCopy[investorIndex].startups = startups;
      setSessionStorageData(storageCopy);
    } else {
      const pastDeletedStartups = JSON.parse(investor);
      const lastDeletedStartup =
        pastDeletedStartups[pastDeletedStartups.length - 1];
      startups.push(lastDeletedStartup);
      // Update session storage.
      storageCopy[investorIndex].startups = startups;
      setSessionStorageData(storageCopy);
      // Proceed to remove added startup from deleted pool
      pastDeletedStartups.splice(pastDeletedStartups.length - 1, 1);
      sessionStorage.setItem(investorName, JSON.stringify(pastDeletedStartups));
    }
  }
}
