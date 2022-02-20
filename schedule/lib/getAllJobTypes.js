const ctx = require("./context");

const getAllJobTypes = (req, res) => {
  res.json({ data: ctx.getAllJobTypes() });
};

module.exports = getAllJobTypes;
