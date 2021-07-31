const typescript = require("@rollup/plugin-typescript");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const merge = require("lodash/merge");
const snakeCase = require("lodash/snakeCase");

const { RemoveExports } = require("./plugins/RemoveExportsPlugins");

exports.createServerConfig = function ({
  name,
  input = "src/index.ts",
  output = `${(name && snakeCase(name)) || "bundle"}`,
}) {
  return merge({
    input,
    output: {
      file: `dist/${output}.js`,
    },
    treeshake: "safest",
    plugins: [nodeResolve(), typescript(), commonjs(), RemoveExports()],
  });
};
