const axios = require('axios');
const express = require('express');

const app = express();

app.use(express.json());

const events = [];

app.post('/events', async (req, res) => {
  const { body: event } = req;

  events.push(event);

  try {
    await Promise.all([
      axios.post('http://posts-clusterip-srv:4000/events', event), // posts microservice
      axios.post('http://comments-clusterip-srv:4001/events', event), // comments microservice
      axios.post('http://query-clusterip-srv:4002/events', event), // query microservice
      axios.post('http://moderation-clusterip-srv:4003/events', event)  // moderation microservice
    ])
  } catch(err) {
    console.log(err.message);
  }

  res.send({ status: 'OK' });
});

app.get('/events' , ( req , res ) => {
  res.send(events);
}); 

app.listen(4005, () => {
    console.log('cluster ip');
    console.log('Event bus on 4005');
});