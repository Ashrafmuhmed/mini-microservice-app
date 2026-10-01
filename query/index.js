const express = require('express');
const cors = require('cors');
const app = express();

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

app.get('/posts', ( req , res ) => {
    res.send(posts);
});

app.post('/events', ( req , res ) => {
    const { type , data } = req.body;
    console.log( type , data );

    if( type === 'PostCreated' ){
        const { id , title } = data;
        posts[id] = { id , title , comments : [] };
    }

    if( type === 'CommentCreated' ){
        const { postId , id , title , status } = data;
        posts[postId].comments.push({ id , title , status });
    } 
    
    console.log(posts);
    

});


app.listen( 4002 , () => {
    console.log('Query service running on 4002');
})