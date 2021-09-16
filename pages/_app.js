import '../styles/globals.css'
import { useEffect } from 'react';
import Login from './login';
import {auth, db} from '../firebaseConfig';
import  {useAuthState} from 'react-firebase-hooks/auth';
import Loading from '../components/Loading';
import firebase from "firebase/compat/app";
// import Home from './index';


function MyApp({ Component, pageProps }) {

  const [user,loading] = useAuthState(auth);


  useEffect(() => {
    if(user){

      db.collection('users').doc(user.uid).set(
        {
        name : user.displayName,
        email : user.email,
        online: true,
        lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
        photoURL : user.photoURL,
      },
      {
        merge: true
      });
  }
  }, [user]);


  if(loading) return <Loading />  
  if(!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
