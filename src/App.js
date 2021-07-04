import React,{useState,useEffect} from 'react'
import "./App.css"
import db from './firebase'
import Post from './Post'
function App() {
  const [posts,setPosts]=useState([{
    username:"hari",
    comment:"hello",
    url:"https://th.bing.com/th/id/OIP.2Rd4eGdhT8Va58AxkrKXQAHaHa?pid=ImgDet&rs=1"
  }
])

useEffect(()=>{
  db.collection("posts").onSnapshot(snapshot=>{
    setPosts(snapshot.docs.map(doc=>doc.data()))
  })

},[])
  return (
    <div className="app">
      <div className="app__header">
        <img className="app__image" src="https://th.bing.com/th/id/OIP.2Rd4eGdhT8Va58AxkrKXQAHaHa?pid=ImgDet&rs=1" alt="instagram-logo" />

      </div>
      {
        posts.map(post=>(
          <Post username={post.username} comment={post.comment} imageUrl={post.url} />
        ))
      }
    </div>
  )
}

export default App
