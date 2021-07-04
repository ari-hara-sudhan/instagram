import React from 'react'
import "./Post.css"
import { Avatar } from '@material-ui/core';
function Post({username,comment,imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar/>
            <h3 className="post__user">{username}</h3>
            </div>
            <img className="post__image" src= {imageUrl} alt="insta-logo"/>
            <p className="post__info"><strong className="post__content">{username}</strong>{comment}</p>
            
        </div>
    )
}

export default Post
