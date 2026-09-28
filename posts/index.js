const express = require('express');
const cr  = require('crypto')
const app = express();
const axios = require('axios');
const cors = require('cors');
app.use(express.json());
app.use(cors());
const posts = {};

app.get( '/posts' , (req , res) => {
    res.send(posts);
});

app.post( '/posts' , async (req , res) => {
    const { title } = req.body;
    const id = cr.randomBytes(4).toString('hex');
    if(title.trim()==="") return res.status(404).send("stop messing");
    console.info("New post being created" , title);
    posts[id] = {
        id,title
    };
    const event = { type : 'PostCreated' , data : posts[id] };
    await axios.post('http://localhost:4005/events', event)

    res.status(201).send(posts[id]);

});

app.listen( 4000 , () => {
    console.log('Listening on 4000');
})