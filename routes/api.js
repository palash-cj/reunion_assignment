const express=require("express");
const app=express.Router();

const {userLogin,follow,unfollow,getUser}=require('../controller/user');
const {createPost, deletePost, like, unlike, getPost, getAllPost}=require('../controller/post');
const comment=require("../controller/comment");

const userAuth=require('../middlewares/user');// middleware for authentication

app.post('/authenticate',userLogin);//endpoint to login
app.post('/follow/:id',userAuth,follow);// endpoint to follow the second user
app.post('/unfollow/:id',userAuth,unfollow);// endpoint to unfollow the second user
app.get('/user',userAuth,getUser);// endpoint to get the second user

app.post('/posts',userAuth,createPost);// endpoint to create new post
app.delete('/posts/:id',userAuth,deletePost);//endpoint to delete the post
app.post('/like/:id',userAuth,like);//endpoint to like the post
app.post('/unlike/:id',userAuth,unlike);//endpoint to unlike the post
app.post('/comment/:id',userAuth,comment);//endpoint to comment on the post

app.get('/posts/:id',userAuth,getPost);//endpoint to get the post
app.get('/all_posts',userAuth,getAllPost);//endpoint to get all the posts


module.exports=app;