import React, { useEffect, useState } from 'react'
import "./Post.css"
import { Avatar } from '@material-ui/core';
import db from './firebase';
import { Button } from '@material-ui/core';
function Post({username,comment,imageUrl,postId}) {
    const [comments,setComments]=useState([]);
    const [input,setInput]=useState();

    const post=(e)=>{
    

    }
    useEffect(()=>{
        let unsubcribe;
        if(postId){
            unsubcribe=db.collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot(snapshot=>{
                setComments(snapshot.docs.map(doc=>doc.data()))
            });


        }
        return()=>{
            unsubcribe();
        }
    },[postId])
    return (
        <div className="post">
            <div className="post__header">
            <Avatar/>
            <h3 className="post__user">{username}</h3>
            </div>
            <img className="post__image" src= {imageUrl} alt="insta-logo"/>
            <p className="post__info"><strong className="post__content">{username}</strong>{comment}</p>
            <div className="post__container" >
         {
             comments.map(comment=>(
                 <p>{comment.text} {comment.username}</p>
    ))
         }

        

   

     </div>    
            <form className="post__form">
                <input value={input} onChange={e=>setInput(e.target.value)} />
                <Button type="submit" onClick={post}>Post</Button>


            </form>
          
         
        </div>
    )
}

export default Post
