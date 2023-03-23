function isNumber(value) {
  if (typeof value === "string") {
      return !isNaN(value);
  }
}

exports.isNumber = isNumber;