// Methods that helps us merge the initial data of Investors with Startups.

/*
  First we need to match investors that have specifically added an interest.
  - Investors can't hold more than 10 startups.
  - Startups can't be matched twice. So only match if it hasn't been matched.
  - Once matched, remove them from pool.
*/

// Function to loop through investors and startups to match investors with startups of their
// interest
function matchInvestorsWithInterests(investors, startups, store) {
  // Since investors and startups are arrays, we need to access each element by their respective index.

  // First match investors that have specific interests with the respective startups.
  // The second condition verifies if the startup is not present within the array of startups at investor.
  for (let i = 0; i < investors.length; i++) {
    for (let j = 0; j < startups.length; j++) {
      if (investors[i][1] === startups[j][1]) {
        if (
          store[i].startups.length < 10 &&
          store[i].startups.indexOf(startups[j][0]) === -1
        ) {
          store[i].startups.push(startups[j]);
          // Eliminate the startup from the pool once it has been matched.
          startups.splice(j, 1);
        }
      }
    }
  }
};

// Function that helps us do a second pass to match investors that have any as an interest and match the rest of the startups.
function matchInvestorsWithAnyInterest(investors, startups, store) {
  for (let i = 0; i < investors.length; i++) {
    for (let j = 0; j < startups.length; j++) {
      if (
        store[i].startups.length < 10 &&
        store[i].startups.indexOf(startups[j][0]) === -1
      ) {
        store[i].startups.push(startups[j]);

        // Eliminate the startup from the pool once it has been matched.
        startups.splice(j, 1);
        j = 0;
      }
    }
  }
};

export default function mergeInvestorsStartups(investors, startups) {
  const investorsCopy = [...investors];
  const startupsCopy = [...startups];
  // Store will hold the merged data
  const store = []

  // Loops through investorsCopy and for each element, creates an empty object with
  // properties that will hold our information at store.
  for (let i = 0; i < investorsCopy.length; i++) {
    store.push({ name: investorsCopy[i][0], interest: investorsCopy[i][1], startups: []});
  }

  matchInvestorsWithInterests(investorsCopy, startupsCopy, store);
  matchInvestorsWithAnyInterest(investorsCopy, startupsCopy, store);

  return store;
};

// Here I had a problem which I couldn't solve. For the investor called Lisha, I ended up with 9 startups.
// And with 1 startups left in the startups array.
