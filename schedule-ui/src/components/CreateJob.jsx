import React, { useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import { useJobTypes } from "../hooks/useHttp";
import api from "../utils/api";

const CroneRule = ({ jobRule, setJobRule }) => {
  const handleChange = (evt) => {
    setJobRule(evt.target.value);
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="rule" className="pb-1 font-bold">
        Cron Rule
      </label>
      <p className="text-xs pb-2">
        Use{" "}
        <a
          href="https://crontab.guru/"
          target="_blank"
          className="font-bold text-cyan-600 hover:text-cyan-900"
        >
          Cron Generator
        </a>{" "}
        to create schedule expressions
      </p>
      <input
        type="text"
        name="rule"
        id="rule"
        className="text-md px-4 py-2 border border-blue-500 rounded-md tracking-widest"
        value={jobRule}
        onChange={handleChange}
      />
    </div>
  );
};

const JobType = ({ jobType, setJobType }) => {
  const [jobTypes] = useJobTypes();
  const onTypeChange = (evt) => {
    setJobType(evt.target.value);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="job-type" className="pb-1 font-bold">
        Job Type
      </label>
      <p className="text-xs pb-2">Select a job type from the list below</p>
      <select
        name="job-type"
        id="job-type"
        className="text-md px-4 py-2 border border-blue-500 rounded-md appearance-none form-select"
        value={jobType}
        onChange={onTypeChange}
      >
        <option value="none">Select Job Type</option>
        {jobTypes &&
          jobTypes.lenght !== 0 &&
          jobTypes.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
      </select>
    </div>
  );
};

const ConfirmButton = () => {
  return (
    <div className="pt-2">
      <input
        type="submit"
        value="Create Job"
        className="appearance-none px-4 py-2 border rounded-md shadow-md w-full bg-sky-500 text-white cursor-pointer hover:bg-sky-600 hover:text-white active:bg-sky-700"
      />
    </div>
  );
};

const ScheduledJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [lastUpdateAt, setLastUpdate] = useState(Date.now());
  const [lastUpdateCount, setLastUpdateCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setLastUpdateCount(lastUpdateCount + 1000),
      1000
    );

    return () => clearTimeout(timeout);
  }, [lastUpdateCount]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      api.getScheduledJobs().then((jobs) => {
        setJobs(jobs);
        setLastUpdateCount(0);
        setLastUpdate(Date.now());
      });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [lastUpdateAt]);

  const handleJobRemove = (jobId) => () => {
    api.removeJob(jobId).then(() => {
      setJobs([...jobs.filter((job) => job.jobId != jobId)]);
    });
  };

  return (
    <div className="mt-8">
      <div>Last update: {humanizeDuration(lastUpdateCount)} ago</div>
      <div className="space-y-4">
        {jobs && jobs.length != 0 ? (
          jobs.map(({ jobId, type, rule }) => {
            return (
              <div className="flex items-center space-x-2">
                <div>{jobId}</div>
                <div>{type}</div>
                <div>{rule}</div>
                <button
                  className="text-red-300 hover:text-red-500 bg-slate-50 rounded-md px-2 py-2 hover:bg-white"
                  onClick={handleJobRemove(jobId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            );
          })
        ) : (
          <h3 className="font-bold">No Scheduled Jobs</h3>
        )}
      </div>
    </div>
  );
};

const CreateJob = () => {
  const [newJobError, setNewJobError] = useState(null);
  const [jobRule, setJobRule] = useState("* * * * * *");
  const [jobType, setJobType] = useState("none");

  useEffect(() => {
    console.log("selected job type", jobType);
  }, [jobType]);

  useEffect(() => {
    console.log("set job rule", jobRule);
  }, [jobRule]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log("new job type", jobType);
    console.log("new job rule", jobRule);

    api
      .createJob({ jobType, jobRule })
      .then((job) => {
        setNewJobError(null);
        setJobType("none");
      })
      .catch((error) => setNewJobError(error));
  };

  return (
    <>
      <div className="flex flex-col bg-slate-50 w-2/4 p-4 border border-slate-300 rounded-md">
        <h3 className="text-xl font-bold pb-1">Create Job</h3>
        <hr />
        <form onSubmit={handleFormSubmit} className="overflow-auto space-y-2">
          <CroneRule jobRule={jobRule} setJobRule={setJobRule} />
          <JobType jobType={jobType} setJobType={setJobType} />
          {newJobError && (
            <div className="text-red-500 text-sm">{newJobError}</div>
          )}
          <ConfirmButton />
        </form>
      </div>
      <ScheduledJobs />
    </>
  );
};

export default CreateJob;
