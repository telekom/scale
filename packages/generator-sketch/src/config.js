module.exports = {
  fontReplacer: function (jsonValue) {
    if (jsonValue === "system-ui") {
      return "Helvetica";
    } else if (jsonValue === "-apple-system") {
      return "Helvetica";
    }
  },
};
