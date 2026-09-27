const express = require('express');
const { v4: uuid4 } = require('uuid');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.post('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params;
  const { title } = req.body;
  const id = uuid4();
  const comments = commentsByPostId[postId] || [];
  comments.push({ id, title });
  commentsByPostId[postId] = comments;
  res.status(201).send({ id, title });
});

app.get('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params;
  res.status(200).send(commentsByPostId[postId] || []);
});

app.listen(4001, () => {
  console.log('comments service is listening at 4001');
});
