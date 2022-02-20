const cronValidator = require("cron-validator");
const tasks = require("./tasks");

class Context {
  constructor() {
    this.state = [];
  }

  async getState() {
    return new Promise((resolve) => {
      // mocking Async call
      setTimeout(() => resolve([...this.state]), 600);
    });
  }

  async removeJob(jobId) {
    const result = this.state.filter((job) => job.jobId != jobId);
    this.state = [...result];
  }

  async createJob({ type, rule }) {
    const jobId = `job-${Date.now()}`;

    if (!cronValidator.isValidCron(rule, { seconds: true })) {
      return Promise.reject(new Error(`Invalid Cron rule "${rule}"`));
    }

    if (!tasks.isValidType(type)) {
      return Promise.reject(new Error(`Invalid Job type "${type}"`));
    }

    const job = {
      jobId,
      type,
      rule,
    };

    this.state.push(job);
    return Promise.resolve(job);
  }
}

module.exports = new Context();
