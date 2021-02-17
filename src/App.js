import React,{useState,useEffect} from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom"
import {AllDataContext} from "./context"
import firebase from 'firebase/app'
import FirebaseConfig from './config/FirebaseConfig'
import Admin from './Admin';
import Form from "./Form"
import 'firebase/firestore'
firebase.initializeApp(FirebaseConfig)

const App = () => {

  const [getAllData, setGetAllData] = useState()
    const [dep] = useState(true)

  useEffect(()=> {
       function getUserData(){
         firebase.firestore()
                    .collection("surveyResponse")
                    .get()
                    .then(getData => {
                         setGetAllData(getData);
                    })
    }
     getUserData()
        },[dep]) 

  return (
<BrowserRouter>
<AllDataContext.Provider value={{getAllData, setGetAllData}}>
  <Switch>
    <Route exact path="/" component={Form}/>
    <Route exact path="/admin" component={Admin}/>
  </Switch>
  </AllDataContext.Provider>
</BrowserRouter>
   );
}

export default App;