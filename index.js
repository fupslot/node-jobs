const http = require("./lib/express");
const ctx = require("./lib/context");
const jobs = require("./lib/jobs");

const getAllJobs = require("./lib/getAllJobs");
const createJob = require("./lib/createJob");
const removeJob = require("./lib/removeJob");

const port = parseInt(process.env.PORT) || 3000;

const main = async () => {
  await jobs.initialize();

  http.get("/jobs/", getAllJobs);
  http.post("/jobs/", createJob);
  http.delete("/jobs/:jobId/", removeJob);

  http.listen(port, () => console.log("Start listener on port", port));
};

main().catch(console.error);
