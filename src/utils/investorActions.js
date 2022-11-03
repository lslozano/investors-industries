// Class that helps us handle Investor Actions - CRUD
export default class InvestorActions {
  editInvestorName(investorName, newName, data, navigate) {
    const { localStorageData, sessionStorageData, setSessionStorageData } =
      data;
    let storageCopy;
    if (sessionStorageData === null) {
      storageCopy = [...localStorageData];
    } else {
      storageCopy = [...sessionStorageData];
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
  }
}
