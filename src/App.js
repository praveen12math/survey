
import React,{useState} from 'react'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import "./App.css"
import "react-toastify/dist/ReactToastify.css";

import FirebaseConfig from './config/FirebaseConfig'
import { ToastContainer,toast } from 'react-toastify'
firebase.initializeApp(FirebaseConfig)

const App = () => {

  const [isEmailVerify, setIsEmailVerify] = useState(false)
  const [isUser, setIsUser] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userPic, setUserPic] = useState()
  const [isRedirect, setIsRedirect] = useState(false)


  function handleVerify() {
  const provider = new firebase.auth.GoogleAuthProvider()

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
   console.log(result.user.photoURL);
setUserPic(result.user.photoURL)
    setIsEmailVerify(result.user.emailVerified)
    setIsUser(result.user.displayName)
    setUserEmail(result.user.email)
  }).catch((error) => {
    console.log(error);
  });
}

function handleResponse(){
  firebase.firestore()
  .collection('surveyResponse')
  .add({
    email: userEmail,
    name: isUser,
    rollno: document.getElementById("rollno").value,
    message: document.getElementById("message").value,
    intrest: document.getElementById("option").value
  })
  .then(function (res){
    return(
      toast("Your response is saved", {type: "success"}),
        alert('Your response saved'),
        setIsRedirect(true)
    )
  })
  .catch(function (error){
    toast(error, {type: "error"})
  })
}

  return(
    <div style={{marginTop:"100px"}}>
    <img className="mx-auto d-block" src={userPic} alt="" style={{borderRadius:"60%"}}/>
    {/* <img className="mx-auto d-block" src="https://lh3.googleusercontent.com/a-/AOh14GhV2T8H5UWZlJ-sgv4WY_Y3WpFcdJjiAvVqTu3u=s96-c" alt="" style={{borderRadius:"60%"}}/> */}
    <div className="row g-0">
    <ToastContainer position="top-right" />
    <div className="col-1"></div>
      <div className="col" >
      {isEmailVerify?
       <div className="form">
       <label>Name</label>
         <input type="text" value={isUser} name="" id="name" className="form-control" onClick={toast("Authorization successful", {type: "success"})}/>
         <label>Email</label>
         <input type="email" name="" value={userEmail} id="email" className="form-control"/>
         <label>Roll No</label>
         <input type="text" name="rollno" id="rollno" className="form-control"/>
         <label htmlFor="">Intrested in</label>
         <select className="form-select" name="" id="option">
          <option value="Nothing">Nothing</option>
           <option value="C Programming">C Programming</option>
           <option value="Web Development">Web Development</option>
         </select>
         <label htmlFor="">Any Suggestion</label>
         <textarea className="form-control" id="message" rows="3"/><br/>
         <button onClick={handleResponse} className="btn btn-warning form-control">Submit</button>

       </div>
       :
       <>

       <div className="row">
       <div className="col-lg-6">
         <img src="fingerprint.gif" alt="" style={{width:"100%"}}/>
       </div>
       <div className="col-lg-4" style={{marginTop:"118px"}}>
        <div>
          <img src="googleLogo.png" alt="" style={{width:"30%", display:"block",marginLeft:"auto",marginRight:"auto"}} onClick={handleVerify}/>
        </div>
        <h3 className="text-center">Authenticate with Google</h3>
        </div>
        </div>
        </>
       }
      </div>
      <div className="col-1"></div>
    </div>
    {isRedirect? window.location.href="http://localhost:3000" :""}
    </div>
  )
}

export default App