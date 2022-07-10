export const pluralization = (amount: number, genitivePlural: string, nominative: string, genitive: string) => {
  let dec = 0;
  return (
    amount +
    ' ' +
    (((dec = amount % 100) >= 11 && dec <= 19) || (dec = amount % 10) >= 5 || dec == 0
      ? genitivePlural
      : dec == 1
      ? nominative
      : genitive)
  );
};
