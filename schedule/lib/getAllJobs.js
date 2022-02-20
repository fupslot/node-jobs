const ctx = require("./context");

const getAllJobs = async (req, res) => {
  const data = await ctx.getState();

  res.json({ data });
};

module.exports = getAllJobs;
