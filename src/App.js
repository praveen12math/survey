// //setOtp(otp+=num[Math.floor(Math.random()*10)])
// import React,{useState} from "react"
// import emailjs from 'emailjs-com'

// const App = () => {

//   const [otp1, setOtp1] = useState(Math.floor(Math.random()*10))
//   const [otp2, setOtp2] = useState(Math.floor(Math.random()*10))
//   const [otp3, setOtp3] = useState(Math.floor(Math.random()*10))
//   const [otp4, setOtp4] = useState(Math.floor(Math.random()*10))
//   const [otp, setOtp] = useState(`${otp1}`+`${otp2}`+`${otp3}`+`${otp4}`)

//   function sendEmail(e) {
//     e.preventDefault();

//     emailjs.sendForm('service_9ivc584', 'template_5ep281u', e.target, 'user_zlyzhGRkWJJwxQzMajWGQ')
//       .then((result) => {
//           console.log(result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//   }

//   const generateOtp = () => {

//    // var num = '0123456789'

//     setOtp1(Math.floor(Math.random()*10))
//     setOtp2(Math.floor(Math.random()*10))
//     setOtp3(Math.floor(Math.random()*10))
//     setOtp4(Math.floor(Math.random()*10))
//     setOtp(`${otp1}`+`${otp2}`+`${otp3}`+`${otp4}`)
    
//     //  for(let i=0;i<4;i++){
//     //   setOtp(Math.floor(Math.random()*10))  
//     //   console.log(otp);
//     //  }
//   }

//   return (
//     <div>
//      <h1>{otp}</h1><br/>{/*
//     <h1>{otp2}</h1><br/>
//     <h1>{otp3}</h1><br/>
//     <h1>{otp4}</h1><br/>
//     <h1>{otp}</h1><br/> */}
//     <button onClick={generateOtp}>Generate Otp</button>
//     <form className="contact-form" onSubmit={sendEmail}>
//       <input type="hidden" name="contact_number" />
//       <label>Name</label>
//       <input type="text" name="user_name" />
//       <label>Email</label>
//       <input type="email" name="user_email" />
//       <label>Message</label>
//       <textarea name="message" />
//       <input type="submit" value="Send" />
//     </form>
//     </div>
//   )
// }

// export default App


import React,{useState} from 'react'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import "./App.css"
import "react-toastify/dist/ReactToastify.css";

import FirebaseConfig from './FirebaseConfig'
import { ToastContainer,toast } from 'react-toastify'
firebase.initializeApp(FirebaseConfig)

const App = () => {

  const [isEmailVerify, setIsEmailVerify] = useState(false)
  const [isUser, setIsUser] = useState()
  const [userEmail, setUserEmail] = useState()
  const [isRedirect, setIsRedirect] = useState(false)


  function handleVerify() {
  const provider = new firebase.auth.GoogleAuthProvider()

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
//    console.log(result.user.email);
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
    message: document.getElementById("message").value
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
    <div className="row g-0">
    <ToastContainer position="top-right" />
    <div className="col-1"></div>
      <div className="col" >
      {isEmailVerify?
       <div className="form">
       {toast("Authorization successful", {type: "success"})}
       <label>Name</label>
         <input type="text" value={isUser} name="" id="name" className="form-control"/>
         <label>Email</label>
         <input type="email" name="" value={userEmail} id="email" className="form-control"/>
         <label>Roll No</label>
         <input type="text" name="rollno" id="rollno" className="form-control"/>
         <label htmlFor="">Message</label>
         <textarea className="form-control" id="message" rows="3"/><br/>
         <button onClick={handleResponse} className="btn btn-warning form-control">Submit</button>

       </div>
       :
       <>
       <div className="card bg-info" onClick={handleVerify}>
        <div className="card-head text-center"><h1>Authenticate with Google</h1></div>
        <div className="card-body text-center">
          <img src="googleLogo.png" alt="" style={{width:"30%"}}/>
        </div>
        </div>
        <h5 className="text-center">You are not authenticated, Please authenticate with Google</h5>
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