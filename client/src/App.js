import React from 'react';
import { CreatePost } from './PostCreate';
import { PostList } from './PostList';

export const AppTitle = () => <div className="container">
    <h1>Create Post</h1>
    <CreatePost />
    <hr />
    <h1> Posts </h1>
    <PostList />
</div>;

