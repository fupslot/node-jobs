const jobs = require("./jobs");

const getAllJobs = async (req, res) => {
  const data = await jobs.getAllJobs();

  res.json({ data });
};

module.exports = getAllJobs;
