const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json())

app.post('/events' , async ( req , res ) => {

    const { type , data } = req.body;
    console.log(type);
    if(type === 'CommentCreated'){
        const { title } = data;
        const status = title.toLowerCase().includes('orange') ? 'rejected' : 'approve';
        const event = {
            type : 'CommentModerated',
            data : { ...data , status }
        };
        await axios.post('http://localhost:4005/events',event);
    }

});

app.listen(4003, ( err ) => {
    if(!err)
        console.log('Moderation service is running on 4003');
    else 
        console.log(err);
});