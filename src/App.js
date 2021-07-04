import React,{useState,useEffect} from 'react'
import "./App.css"
import db, { auth } from './firebase'
import Post from './Post'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const [posts,setPosts]=useState([
])
const classes = useStyles();
const [modalStyle] = useState(getModalStyle);
const [open, setOpen] = useState(false);
const [openSignup, setOpenSignup] = useState(false);
const[name,setName]=useState()
const[email,setEmail]=useState()
const[password,setPassword]=useState();
const [user,setUser]=useState(null);



useEffect(()=>{
  const unsubcribe=auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      setUser(authUser);
    }
    else{
      setUser(null)
    }
  })
  return()=>{
    unsubcribe();
  }
},[user,name])
const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const handleOpenSignup = () => {
  setOpenSignup(true);
};

const handleCloseSignup = () => {
  setOpenSignup(false);
};
const signin=(e)=>{
  e.preventDefault();

  auth.signInWithEmailAndPassword(email,password)
  .catch((error)=>alert(error.message))
  handleCloseSignup();
}
const signup=(e)=>{
  e.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    authUser.user.updateProfile({
      displayName:name
    })
  })
  .catch((error)=>alert(error.message));
  setName("");
  setEmail("");
  setPassword("");
  handleClose();
}
useEffect(()=>{
  db.collection("posts").onSnapshot(snapshot=>{
    setPosts(snapshot.docs.map(doc=>({id:doc.id,post:doc.data()})))
  })

},[])
  return (
    <div className="app">
        <Modal
        open={open}
        onClose={handleClose}
      >
      <div style={modalStyle} className={classes.paper} >
        <form className="app__form">
          <center>
          <img className="app__image" src="https://th.bing.com/th/id/OIP.2Rd4eGdhT8Va58AxkrKXQAHaHa?pid=ImgDet&rs=1" alt="instagram-logo" />
          </center>
          <input
          value={name}
          onChange={e=>setName(e.target.value)}
          placeholder="Enter the Name"
          />
           <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Enter the email"
          />
           <input
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Enter the password"
          />
          <Button type="submit" onClick={signup}>Signup</Button>
        </form>
      </div>
      </Modal>
      <Modal
        open={openSignup}
        onClose={handleCloseSignup}
      >
      <div style={modalStyle} className={classes.paper} >
        <form className="app__form">
          <center>
          <img className="app__image" src="https://th.bing.com/th/id/OIP.2Rd4eGdhT8Va58AxkrKXQAHaHa?pid=ImgDet&rs=1" alt="instagram-logo" />
          </center>
           <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Enter the email"
          />
           <input
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Enter the password"
          />
          <Button type="submit" onClick={signin}>SignIn</Button>
        </form>
      </div>
      </Modal>
      <div className="app__header">
        <img className="app__image" src="https://th.bing.com/th/id/OIP.2Rd4eGdhT8Va58AxkrKXQAHaHa?pid=ImgDet&rs=1" alt="instagram-logo" />
      
        <div className="app__button">
          {user? (
            <Button onClick={()=>auth.signOut()} >LogOut</Button>

          ):(
            <>
            <Button onClick={()=>handleOpen()}>Signup</Button>
            <Button onClick={()=>handleOpenSignup()} >SignIn</Button>
            </>
          )
        
        }
         
        </div>
      

      </div>
   
     
      {
        posts.map(({post,id})=>(
          <Post postId={id} username={post.username} comment={post.caption} imageUrl={post.imageUrl} />
        ))
      }
         {
        user?.displayName?(
          <ImageUpload username={user.displayName}/>
        ):(
          <p>Sorry u need to LoginIn</p>
        )
      }
    </div>
  )
}

export default App
