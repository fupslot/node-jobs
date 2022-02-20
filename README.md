### References

- Node Schedule - https://www.npmjs.com/package/node-schedule
- Cron Generator - https://crontab.guru/

---

### Start App

```
docker-compose up -d
```

UI: http://localhost:3000/


### Create Job

Note: Currently the only value for the `type` field is `ping`. This job just prints into a log the current local time .

```
curl -XPOST -H "Content-Type: application/json" -d'{"type":"ping", "rule": "*/2 * * * * *"}'  "http://localhost:5000/jobs/"

{"data":{"jobId":"job-1645295567481","type":"ping","rule":"*/2 * * * * *"}}
```

### Delete Job

```
curl -XDELETE "http://localhost:5000/jobs/job-1645295567481/" 

{"data":{"jobId":"job-1645295567481"}}
```

### Get All Jobs

```
curl http://localhost:5000/jobs/
```

### Get All Job Types

```
curl http://localhost:5000/jobs/types/
```

