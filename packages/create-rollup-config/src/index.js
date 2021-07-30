const typescript = require("@rollup/plugin-typescript");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const merge = require("lodash/merge");

exports.createConfig = function ({ input, outputFile }) {
  return merge({
    input,
    output: {
      file: outputFile,
      format: "iife",
    },
    treeshake: "safest",
    plugins: [
      nodeResolve({ jsnext: true }),
      commonjs({ include: ["node_modules/**"] }),
      typescript(),
    ],
  });
};
