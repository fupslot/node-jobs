const http = require("./lib/express");
const jobs = require("./lib/jobs");

const getAllJobs = require("./lib/getAllJobs");
const getAllJobTypes = require("./lib/getAllJobTypes");
const createJob = require("./lib/createJob");
const removeJob = require("./lib/removeJob");
const { printBanner } = require("./lib/helpers");

const port = parseInt(process.env.PORT) || 3000;

const main = async () => {
  await jobs.initialize();

  http.get("/jobs/", getAllJobs);
  http.get("/jobs/types", getAllJobTypes);
  http.post("/jobs/", createJob);
  http.delete("/jobs/:jobId/", removeJob);

  http.listen(port, printBanner({ port }));
};

main().catch(console.error);
