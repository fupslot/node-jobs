const ctx = require("./context");

const removeJob = async (req, res) => {
  const { jobId } = req.params;

  await ctx.removeJob(jobId);

  res.json({ data: { jobId } });
};

module.exports = removeJob;
