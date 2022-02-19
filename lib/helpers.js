const tasks = require("./tasks");

// Create a filled with zeros Array
function makeArray(len) {
  if (len == 0) {
    return [];
  }
  let a = [0];
  let currlen = 1;
  while (currlen < len) {
    const rem = len - currlen;
    if (rem < currlen) {
      a = a.concat(a.slice(0, rem));
    } else {
      a = a.concat(a);
    }
    currlen = a.length;
  }
  return a;
}

function createStateMap(state) {
  return state.reduce((obj, job) => {
    obj[job.jobId] = job;
    return obj;
  }, {});
}

function createJobHandler(job) {
  const task = tasks[job.type];
  return async () => task(job);
}

const runBeforeExit = [];
function beforeExit(asyncCallback) {
  runBeforeExit.push(asyncCallback);
}

process.on("SIGINT", function () {
  const promised = runBeforeExit.map((fn) => fn());
  Promise.all(promised).then(() => process.exit(0));
});

function printBanner({ port }) {
  console.log(`
  Create Job

  curl -XPOST -H "Content-Type: application/json" -d'{"type":"ping", "rule": "*/2 * * * * *"}'  "http://localhost:3000/jobs/"

  Delete Job

  curl -XDELETE "http://localhost:3000/jobs/job-1645295567481/" 

  Get All Jobs

  curl http://localhost:3000/jobs/


  Start listener on port ${port}...
  `);
}

module.exports = {
  makeArray,
  createStateMap,
  beforeExit,
  createJobHandler,
  printBanner,
};
