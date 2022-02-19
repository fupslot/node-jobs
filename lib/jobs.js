const schedule = require("node-schedule");
const debug = require("debug")("jobs");

const ctx = require("./context");

const {
  makeArray,
  createStateMap,
  beforeExit,
  createJobHandler,
} = require("./helpers");

const STATIC_TASK = "*";

class Jobs {
  constructor() {}

  async initialize() {
    // every 5s request Context for the State
    schedule.scheduleJob(STATIC_TASK, "*/5 * * * * *", this.updateState);

    beforeExit(async () => schedule.gracefulShutdown());

    return Promise.resolve();
  }

  stateActions(state, scheduleJobs) {
    const toCancel = [];
    const toSchedule = [];

    // The State array reprents a list of tasks for the schedule
    // The ScheduleJobs is an array of active jobs run by the schedule
    // Example:
    // const state = ["1", "3"]
    // const scheduleJobs = ["*", "2"]
    //
    // toSchedule [ '1', '3' ]
    // toCancel [ '2' ]

    // Right a function that takes the State array as a first argument and the ScheduleJobs as the second
    // and return a list of tasks to cancel and a list of tasks to schedule.

    // the PunchCard is a bit array of jobs that need to be scheduled.
    const punchCard = makeArray(state.length);

    for (const jobId of scheduleJobs) {
      const stateIdx = state.indexOf(jobId);
      if (stateIdx == -1) {
        toCancel.push(jobId);
        continue;
      }
      punchCard[stateIdx] = stateIdx + 1;
    }

    for (let pos = 0; pos < punchCard.length; pos++) {
      if (punchCard[pos] == 0) {
        toSchedule.push(state[pos]);
      }
    }

    if (toSchedule.length) debug("to schedule", toSchedule);
    if (toCancel.length) debug("to cancel", toCancel);

    return {
      toCancel,
      toSchedule,
    };
  }

  updateState = async () => {
    const state = await ctx.getState();
    const stateMap = createStateMap(state);

    const stateJobs = state.map(({ jobId }) => jobId);
    const scheduleJobs = await this.getAllJobs();

    if (state.length) debug("state update", state);

    const { toCancel, toSchedule } = this.stateActions(stateJobs, scheduleJobs);

    toCancel.forEach((jobId) => {
      schedule.cancelJob(jobId);
      debug("Job", jobId, "cancelled");
    });

    toSchedule.forEach((jobId) => {
      const job = stateMap[jobId];
      schedule.scheduleJob(jobId, job.rule, createJobHandler(job));
      debug("Job", jobId, "scheduled");
    });

    return Promise.resolve();
  };

  async getAllJobs() {
    return Promise.resolve(
      Object.keys(schedule.scheduledJobs).filter(
        (jobId) => jobId != STATIC_TASK
      )
    );
  }
}

module.exports = new Jobs();
