import React, { useContext,useState,useEffect } from 'react';
import {AllDataContext} from "./context"

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer,toast } from 'react-toastify'


const Admin = () => {
    const context = useContext(AllDataContext)
    const [getData] = useState(context.getAllData)
    const [adminEmail] = useState("praveen12math@gmail.com")
    const [adminEmail2] = useState("abhisahu12345@gmail.com")
    const [adminEmail3] = useState("harshitranjansrivastava08@gmail.com")
    const [userEmail, setUserEmail] = useState()
    const [userDocId, setUserDocId] = useState()
    const [cseCount, setCseCount] = useState(0)
    const [itCount, setItCount] = useState(0)

    function handleVerify() {
        const provider = new firebase.auth.GoogleAuthProvider()
      
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
         //console.log(result.user.email);
          setUserEmail(result.user.email)
        }).catch((error) => {
          console.log(error);
        });

      }

      useEffect(() => {
        function countResponse() {
            firebase.firestore()
            .collection("surveyResponse").where("branch", "==", "CSE")
            .get()
            .then((data)=>{
                setCseCount(data.size)
            })


            firebase.firestore()
            .collection("surveyResponse").where("branch", "==", "IT")
            .get()
            .then((data)=>{
                setItCount(data.size)
            })


          }

          countResponse()

      },[])

      console.log(userDocId);
      

        function deleteDoc(docID){
            setUserDocId(docID)
            firebase.firestore()
            .collection("surveyResponse")
            .doc(userDocId)
            .delete()
            .then(()=> {
                toast("delete document successfull",{type:"success"})
            })
            .catch((err)=> {
              toast(err.message,{type:"error"})
            })
        }

        function timeConverter(UNIX_timestamp){
          var a = new Date(UNIX_timestamp * 1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
          return time;
        }

        console.log(timeConverter(1613721285));

     // console.log(new Date(getData.docs[1].data().timestamp.seconds));

      if(adminEmail === userEmail || adminEmail2 === userEmail || adminEmail3 === userEmail){
          return(
              <div className="bg-warning">
                  <ToastContainer position="top-right" />
                    <h1 className="text-center">CSE Count <span className="text-success">{cseCount}</span></h1>
              {getData.docs.map((dataR)=> (
                    <div className="row">
                    <div className="col-1"></div>
                    <div className="col mx-auto">
                    {dataR.data().branch === "CSE" ?
                  <div className="card mt-4 mb-2 border-5" style={{borderRadius:"20px"}}>
                  <div className="row">
                      <div className="col-10">
                      <div className="card-body">
                      <i className="fas fa-trash text-danger"
                      style={{cursor:"pointer"}}
                      onClick={()=> deleteDoc(dataR.id)}
                      >                          
                      </i>

                             <h5 className="card-text">{dataR.data().name}</h5>
                            <h5 className="card-text">{dataR.data().email}</h5>
                            <h5 className="card-text">{dataR.data().rollno}</h5>
                            <h5 className="card-text">{dataR.data().intrest}</h5>
                            <h5 className="card-text">{dataR.data().branch}</h5>
                            {/* <h5 className="card-text">{dataR.data().timestamp.nanosecond}</h5> */}
                            <p className="card-text">{dataR.data().message}</p>
                            <p className="card-text">{timeConverter(dataR.data().timestamp.seconds)}</p>
                        </div>
                      </div>
                      <div className="col-lg-2">
                      <img className="img-fluid" src={dataR.data().image} alt="" 
                        style={{width:"100%",borderRadius:"60%",alignSelf:"flex-end"}}/>
                      </div>
                  </div>
                  </div>
                  : "" }
                      
                  </div>
                  <div className="col-1"></div>
                  </div>
              )
              )}

              <h1 className="text-center mt-5">IT Count <span className="text-success">{itCount}</span></h1>
              {getData.docs.map((dataR)=> (
                    <div className="row">
                    <div className="col-1"></div>
                    <div className="col mx-auto">
                    {dataR.data().branch === "IT" ?
                  <div className="card mt-4 mb-2 border-5" style={{borderRadius:"20px"}}>
                 
                  <div className="row">
                      <div className="col-10">
                      <div className="card-body">
                      <i className="fas fa-trash text-danger"
                      style={{cursor:"pointer"}}
                      onClick={()=> deleteDoc(dataR.id)}
                      >                          
                      </i>                   
                             <h5 className="card-text">{dataR.data().name}</h5>
                            <h5 className="card-text">{dataR.data().email}</h5>
                            <h5 className="card-text">{dataR.data().rollno}</h5>
                            <h5 className="card-text">{dataR.data().intrest}</h5>
                            <h5 className="card-text">{dataR.data().branch}</h5>
                            {/* <h5 className="card-text">{dataR.data().timestamp.nanosecond}</h5> */}
                            <p className="card-text">{dataR.data().message}</p>
                            <p className="card-text">{timeConverter(dataR.data().timestamp.seconds)}</p>
                        </div>
                      </div>
                      <div className="col-lg-2">
                      <img className="img-fluid" src={dataR.data().image} alt="" 
                        style={{width:"100%",borderRadius:"60%",alignSelf:"flex-end"}}/>
                      </div>
                  </div>
                  </div>
                  : "" }
                      
                  </div>
                  <div className="col-1"></div>
                  </div>
              )
              )}


              </div>
          )
      }
      else
      {
    return (
        <> 
        <div>
          <img src="googleLogo.png" alt="" style={{width:"20%", display:"block",marginLeft:"auto",marginRight:"auto",cursor:"pointer"}} onClick={handleVerify}/>
        </div>
        <h3 className="text-center" style={{cursor:"pointer"}} onClick={handleVerify}>Authenticate with Google</h3>
        <h1 className="text-center text-danger">Access Denied</h1>
        </>

     )
    }
}
 
export default Admin