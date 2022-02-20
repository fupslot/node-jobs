const Tasks = {
  ping: (job) => console.log("JobId", job.jobId, "Type", job.type, Date.now()),
};

module.exports = {
  ...Tasks,

  isValidType(type) {
    return type in Tasks;
  },
};
