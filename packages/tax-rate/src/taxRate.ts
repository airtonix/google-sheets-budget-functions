export function taxBand(rate: number, lower: number, upper?: number) {
  return (amount: number) => {
    if (upper && amount > upper) return (upper - lower) * rate;
    if (amount > lower) return (amount - lower) * rate;
    return 0;
  };
}

export function tax(rules: ReturnType<typeof taxBand>[], income: number) {
  return rules.reduce((result, rule) => {
    return result + rule(income);
  }, 0);
}

/**
Resident tax rates 2020–21
| Taxable income      | Tax on this income                |
| 0 – $18,200         | Nil                               |
| $18,201 – $45,000   | 19 cents for each $1 over $18,200 |
| $45,001 – $120,000  | $5,092 plus 32.5 cents for each $1 over $45,000 |
| $120,001 – $180,000 | $29,467 plus 37 cents for each $1 over $120,000 |
| $180,001 and over   | $51,667 plus 45 cents for each $1 over $180,000 |
*/
export function taxAuResident2020(amount: number) {
  return tax(
    [
      taxBand(0, 0, 18200),
      taxBand(0.19, 18200, 45000),
      taxBand(0.325, 45000, 120000),
      taxBand(0.37, 120000, 180000),
      taxBand(0.45, 180000),
    ],
    amount
  );
}

/**
Resident tax rates 2019-20

| Taxable income      | Tax on this income                |
| 0 – $18,200         | Nil                               |
| $18,201 – $45,000   | 19 cents for each $1 over $18,200 |
| $45,001 – $120,000  | $5,092 plus 32.5 cents for each $1 over $45,000 |
| $120,001 – $180,000 | $29,467 plus 37 cents for each $1 over $120,000 |
| $180,001 and over   | $51,667 plus 45 cents for each $1 over $180,000 |
*/
export function taxAuResident2019(amount: number) {
  return tax(
    [
      taxBand(0, 0, 18200),
      taxBand(0.19, 18200, 37000),
      taxBand(0.325, 37000, 90000),
      taxBand(0.37, 90000, 180000),
      taxBand(0.45, 180000),
    ],
    amount
  );
}
