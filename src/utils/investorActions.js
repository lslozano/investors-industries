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
        (investor !== null && investor.length > 0) ? [...investor] : [];
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

    const investorIndex = storageCopy.findIndex(
      (investor) => investor.name === investorName
    );

    const { startups } = storageCopy[investorIndex];

    const deletedStartup = startups[startupIndex];
    storageCopy[investorIndex].startups.splice(startupIndex, 1);
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
  }
}
