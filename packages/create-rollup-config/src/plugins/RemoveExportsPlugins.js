exports.RemoveExports = function RemoveExports() {
  return {
    name: "remove-exports",
    generateBundle(options, bundle) {
      bundle = Object.keys(bundle).reduce((results, id) => {
        const chunk = bundle[id] || {};
        delete chunk.exports;
        chunk.code = chunk.code.replace(/export.*/g, "");
        return {
          ...results,
          [id]: chunk,
        };
      }, {});
    },
  };
};
