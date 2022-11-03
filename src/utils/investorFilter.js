// Method that helps us find the current investor
export default function investorFilter(data, investorName) {
  const investor = data.filter((investor) => investor.name === investorName);
  return investor;
};
