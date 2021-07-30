import { createConfig } from "@budget-functions/create-rollup-config";

// eslint-disable-next-line import/no-default-export
export default createConfig({
  input: "src/index.ts",
  outputFile: "dist/tax-rate.js",
});
