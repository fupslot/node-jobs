const ctx = require("./context");

const createJob = async (req, res) => {
  try {
    const data = await ctx.createJob(req.body);
    res.json({ data });
  } catch (e) {
    res.json({ error: e.message });
  }
};

module.exports = createJob;
