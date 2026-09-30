const express = require('express');
const { v4: uuid4 } = require('uuid');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.post('/posts/:id/comments', async (req, res) => {
  const { id: postId } = req.params;
  const { title } = req.body;
  const id = uuid4();
  const comments = commentsByPostId[postId] || [];
  comments.push({ id, title });
  commentsByPostId[postId] = comments;
  const event = {
    id,
    title,
    postId
  };
  console.log(event);
  await axios.post("http://localhost:4005/events",event);
  res.status(201).send({ id, title });
});

app.get('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params;
  res.status(200).send(commentsByPostId[postId] || []);
});

app.post('/events' , ( req , res ) => {
  console.log('Event received', req.body);
  res.send({message:'event received'});
});

app.listen(4001, () => {
  console.log('comments service is listening at 4001');
});
