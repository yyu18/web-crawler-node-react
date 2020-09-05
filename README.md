# How To Start

npm install

npm run server //run node server

npm start //run react 

# Screenshot

![alt text](https://github.com/yyu18/web-crawler-node-react/blob/master/Screenshot-from-2020-09-05-16-08-38.jpg)

![alt text](https://github.com/yyu18/web-crawler-node-react/blob/master/editJob.png)

# RESTFul API

all api saved and tested in test.rest
### Create job
POST http://localhost:3001/jobs
### Update job
PUT http://localhost:3001/jobs/5f51c4b0c89602bb019c6bb3
### Retrieve job
GET http://localhost:3001/jobs?q=full+stack+developer&&start=10
### Delete job
DELETE http://localhost:3001/jobs/5f5230091f4e180e56db1a99

# Database

MongoDB mongodb://localhost/jobs

# Front end

react http://localhost:3000

search, scrap indeed data, 

the data scraped include job title, company location, company name, salary, some company did not put salary, then salary will be empty

nextpage, keep scrap indeed data

https://ca.indeed.com/jobs?q=...&start=...

save job, 

edit job, 

soft delete job