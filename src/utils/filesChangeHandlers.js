import Papa from 'papaparse';

// Class to handle change in the File Input component.
export default class FilesChangeHandler {
  // Helps adding investors.csv and startups.csv
  addInvestorsCSV(event, setInvestors) {
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        setInvestors(results.data);
      },
    });
  };

  // Helps adding startups.csv
  addStartupsCSV(event, setStartups) {
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        setStartups(results.data);
      },
    });
  };
}