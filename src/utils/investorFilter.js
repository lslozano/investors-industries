// Method that helps us find the current investor
export const investorFilter = (data, investorName) => {
  const investor = data.filter((investor) => investor[0] === investorName);
  return investor;
};
