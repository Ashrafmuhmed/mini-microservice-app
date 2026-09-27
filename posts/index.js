const express = require('express');
const cr  = require('crypto')
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const posts = {};

app.get( '/posts' , (req , res) => {
    res.send(posts);
});

app.post( '/posts' , (req , res) => {
    const { title } = req.body;
    const id = cr.randomBytes(4).toString('hex');
    if(title.trim()==="") return res.status(404).send("Fuck you");
    console.info("New post being created" , title);
    posts[id] = {
        id,title
    };

    res.status(201).send(posts[id]);

});

app.listen( 4000 , () => {
    console.log('Listening on 4000');
})