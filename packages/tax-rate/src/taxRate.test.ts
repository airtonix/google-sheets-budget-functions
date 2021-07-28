import { taxBand, tax, taxAuResident2020, taxAuResident2019 } from "./taxRate";

describe("taxBand", () => {
  it("no rate", () => {
    const fn = taxBand(0, 5, 10);
    expect(fn(10)).toBe(0);
  });
  it("50% of half", () => {
    const fn = taxBand(0.5, 5, 10);
    expect(fn(10)).toBe(2.5);
  });

  it("50% of half", () => {
    const fn = taxBand(0.19, 5, 10);
    expect(fn(10)).toBe(0.95);
  });
});

describe("taxable", () => {
  it("with upper rate", () => {
    const fn = (amount: number) =>
      tax(
        [taxBand(0, 0, 5), taxBand(0.25, 5, 10), taxBand(0.5, 10, 20)],
        amount
      );

    expect(fn(10)).toBe(1.25);
    expect(fn(20)).toBe(6.25);
    expect(fn(50)).toBe(6.25);
  });

  it("with no upper rate", () => {
    const fn = (amount: number) =>
      tax([taxBand(0, 0, 5), taxBand(0.25, 5, 10), taxBand(0.5, 10)], amount);

    expect(fn(10)).toBe(1.25);
    expect(fn(20)).toBe(6.25);
    expect(fn(50)).toBe(21.25);
  });
});

describe("taxAuResident2020", () => {
  it("Band 1", () => {
    expect(taxAuResident2020(0)).toBe(0);
    expect(taxAuResident2020(16000)).toBe(0);
    expect(taxAuResident2020(18200)).toBe(0);
  });
  it("Band 2", () => {
    expect(taxAuResident2020(18201)).toBe(0.19);
    expect(taxAuResident2020(45000)).toBe(5092);
  });
  it("Band 3", () => {
    expect(taxAuResident2020(45001)).toBe(5092.325);
    expect(taxAuResident2020(120000)).toBe(29467);
  });
  it("Band 4", () => {
    expect(taxAuResident2020(120001)).toBe(29467.37);
    expect(taxAuResident2020(180000)).toBe(51667);
  });
  it("Band 5", () => {
    expect(taxAuResident2020(180001)).toBe(51667.45);
    expect(taxAuResident2020(180002)).toBe(51667.9);
    expect(taxAuResident2020(180010)).toBe(51671.5);
    expect(taxAuResident2020(200000)).toBe(60667);
    expect(taxAuResident2020(400000)).toBe(150667);
  });
});
