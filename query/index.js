const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(express.json());
app.use(cors());

const posts = {};

/**
 *
 * @example
 * posts = {
 *  postId : {
 *      id : postId,
 *      title : title,
 *      comments : [
 *          { id : commentId , content : 'comment'! }
 *      ]
 *  }
 * }
 */

app.get('/posts', (req, res) => {
  res.send(posts);
});

const handleEvent = ({ type, data }) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { postId, id, title, status } = data;
    posts[postId].comments.push({ id, title, status });
  }

  if (type === 'CommentUpdated') {
    const { postId, id, title, status } = data;
    let comment = posts[postId].comments.find((comment) => comment.id == id);
    comment.id = id;
    comment.title = title;
    comment.status = status;
    console.log(posts[postId]);
  }
};

app.post('/events', (req, res) => {
    handleEvent(req.body);
    res.status(201).send('good');
});

app.listen(4002, async () => {
  console.log('Query service running on 4002');

  const res = await axios.get('http://localhost:4005/events');
  for( let event of res.data ){
    handleEvent(event);
  }
});
