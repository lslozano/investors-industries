export const mergeInvestorsStartups = (investors, startups) => {
  const investorsCopy = [...investors];
  const startupsCopy = [...startups];

  // Loops through investorsCopy and for each element, adds industries property
  // Which will point to an array that can hold startups.
  for (let i = 0; i < investorsCopy.length; i++) {
    investorsCopy[i][2] = [];
  }

  // Loops through investors copy and startups copy to match investors with startups of their
  // interest
  // Since investorsCopy and startupsCopy are arrays, we need to access each element by their respective index.
  // We use copies in order to not alter the state directly.
  for (let i = 0; i < investorsCopy.length; i++) {
    for (let j = 0; j < startupsCopy.length; j++) {
      if (
        investorsCopy[i][1] === startupsCopy[j][1] ||
        investorsCopy[i][1] === 'any'
      ) {
        if (
          investorsCopy[i][2].length < 10 &&
          investorsCopy[i][2].filter(
            (startup) => startup.indexOf(startupsCopy[j][0]) >= 0
          )
        ) {
          investorsCopy[i][2].push(startupsCopy[j]);
          // Eliminate the startup from the pool once it has been matched.
          startupsCopy.splice(j, 1);
        }
      }
    }
  }

  return investorsCopy;
};
