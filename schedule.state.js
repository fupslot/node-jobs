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

// The State array reprents a list of tasks for the schedule
const state = ["1", "3"];
// The ScheduleJobs is an array of active jobs run by the schedule
// const sheduleJobs = ["*", "1", "2", "3", "4"]
const sheduleJobs = ["*", "2"];

// Right a function that takes the State array as a first argument and the ScheduleJobs as the second
// and return a list of tasks to cancel and a list of tasks to schedule.

const mutableJobs = sheduleJobs.filter((id) => id != "*");
console.log("mutable jobs", mutableJobs);

// the PunchCard is a bit array of jobs that need to be scheduled.
const punchCard = makeArray(state.length);
const toCancel = [];
const toSchedule = [];

for (const jobId of mutableJobs) {
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
console.log("punchCard", punchCard);
console.log("to schedule", toSchedule);
console.log("to cancel", toCancel);
