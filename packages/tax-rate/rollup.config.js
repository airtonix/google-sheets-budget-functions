import { createConfig } from "@budget-functions/create-rollup-config";

export default createConfig({
  input: "src/index.ts",
  outputFile: "dist/tax-rate.js",
});
