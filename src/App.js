import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function App() {
  const [investors, setInvestors] = useState();
  const [industries, setIndustries] = useState();
  const [dataMatched, setDataMatched] = useState();

  useEffect(() => {
    if (investors && industries) {
      const investorsCopy = [...investors];
      for (let i = 0; i < investorsCopy.length; i++) {
        investorsCopy[i].industries = [];
      }

      for (let i = 0; i < investorsCopy.length; i++) {
        for (let j = 0; j < industries.length; j++) {
          if (
            investorsCopy[i].bio === industries[j].environment ||
            investorsCopy[i].bio === 'any'
          ) {
            if (investorsCopy[i].industries.length < 10) {
              investorsCopy[i].industries.push(industries[j]);
            }
          }
        }
      }

      setDataMatched(investorsCopy);
    }
  }, [investors, industries]);

  const investorsChangeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        for (let i = 0; i < results.data; i++) {
          results.data[i].industries = [];
        }
        setInvestors(results.data);
      },
    });
  };

  const industriesChangeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        setIndustries(results.data);
      },
    });
  };

  console.log('The data matched:', dataMatched);

  return (
    <div>
      {!investors && (
        <div>
          <label htmlFor="file">Add your investors file</label>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={investorsChangeHandler}
          />
        </div>
      )}
      {!industries && (
        <div>
          <label htmlFor="file">Add your industries file</label>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={industriesChangeHandler}
          />
        </div>
      )}
    </div>
  );
}

export default App;
