const typescript = require("@rollup/plugin-typescript");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const merge = require("lodash/merge");
const snakeCase = require("lodash/snakeCase");
const template = require("rollup-plugin-generate-html-template");

exports.createUiConfig = function ({
  name,
  input = "src/index.ts",
  html = "src/template.html",
  output = `${(name && snakeCase(name)) || "bundle"}`,
}) {
  return merge({
    input,
    output: {
      file: `dist/${output}.js`,
      format: "cjs",
    },
    treeshake: "safest",
    plugins: [
      nodeResolve(),
      typescript(),
      commonjs(),
      template({
        template: html,
        target: `dist/${output}-page.html`,
      }),
    ],
  });
};
