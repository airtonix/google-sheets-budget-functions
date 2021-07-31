import { createUiConfig } from "@budget-functions/create-rollup-config";

// eslint-disable-next-line import/no-default-export
export default createUiConfig({
  input: "src/index.tsx",
  html: "src/index.html",
  output: "tag-multi-select-ui",
});
