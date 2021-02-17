import React, { useContext,useState } from 'react';
import {AllDataContext} from "./context"

import firebase from 'firebase/app'
import 'firebase/auth'


const Admin = () => {
    const context = useContext(AllDataContext)
    const [getData] = useState(context.getAllData)
    const [adminEmail] = useState("praveen12math@gmail.com")
    const [adminEmail2] = useState("abhisahu12345@gmail.com")
    const [userEmail, setUserEmail] = useState()

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

      console.log(getData.docs[0].data().timestamp);

      if(adminEmail === userEmail || adminEmail2 === userEmail){
          return(
              <div className="bg-warning">
                    <h1 className="text-center">Total Count <span className="text-success">{getData.size}</span></h1>
              {getData.docs.map((dataR)=> (
                    <div className="row">
                    <div className="col-1"></div>
                    <div className="col mx-auto">
                  <div className="card mt-4 mb-2 border-5" style={{borderRadius:"20px"}}>
                  <div className="row">
                      <div className="col-10">
                      <div className="card-body">
                             <h5 className="card-text">{dataR.data().name}</h5>
                            <h5 className="card-text">{dataR.data().email}</h5>
                            <h5 className="card-text">{dataR.data().rollno}</h5>
                            <h5 className="card-text">{dataR.data().intrest}</h5>
                            {/* <h5 className="card-text">{dataR.data().timestamp.nanosecond}</h5> */}
                            <p className="card-text">{dataR.data().message}</p>
                        </div>
                      </div>
                      <div className="col-lg-2">
                      <img className="img-fluid" src={dataR.data().image} alt="" 
                        style={{width:"100%",borderRadius:"60%",alignSelf:"flex-end"}}/>
                      </div>
                  </div>
                      
                        
                  </div>
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