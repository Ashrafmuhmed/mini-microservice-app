const axios = require('axios');
const express = require('express');

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
  const { body: event } = req;

  axios.post('http://localhost:4000/events', event); // posts microservice
  axios.post('http://localhost:4001/events', event); // comments microservice
  axios.post('http://localhost:4002/events', event); // query microservice

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log('Event bus on 4005')
})