import React from "react";

const CroneRule = () => {
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
        className="text-md px-4 py-2 border rounded-md tracking-widest"
        value="* * * * * *"
      />
    </div>
  );
};

const JobType = () => {
  return (
    <div className="flex flex-col">
      <label htmlFor="job-type" className="pb-1 font-bold">
        Job Type
      </label>
      <p className="text-xs pb-2">Select a job type from the list below</p>
      <select
        name="job-type"
        id="job-type"
        className="text-md px-4 py-2 border rounded-md appearance-none form-select"
      >
        <option value="none">Select Job Type</option>
        <option value="ping">"Ping"</option>
      </select>
    </div>
  );
};

const ConfirmButton = () => {
  return (
    <>
      <input
        type="submit"
        value="Create Job"
        className="appearance-none px-4 py-2 border rounded-md shadow-md w-full bg-sky-500 text-white cursor-pointer hover:bg-sky-600 hover:text-white active:bg-sky-700"
      />
    </>
  );
};

const CreateJob = () => {
  const onFormSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className="flex flex-col bg-slate-50 w-2/4 p-4 border border-slate-300 rounded-md">
      <h3 className="text-xl font-bold pb-1">Create Job</h3>
      <hr />
      <form
        onSubmit={onFormSubmit}
        className="bg-blue-100 overflow-auto space-y-2"
      >
        <CroneRule />
        <JobType />
        <ConfirmButton />
      </form>
    </div>
  );
};

export default CreateJob;
