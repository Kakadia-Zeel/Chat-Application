import React from "react";
import styled from "styled-components";
import List from './List';
import { useRouter } from "next/router";

import { Button,Avatar } from "@material-ui/core";
import { auth,db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from 'firebase/compat/app';

export default function Sidebar() {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const userRef = db.collection('users').where("email","!=",user.email);
    const [allUserSnapshot] = useCollection(userRef);
   
  
    const signOut = () =>{
        db.collection('users').doc(user.uid).set(
            {
            email : user.email,
            online: false,
            lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
            photoURL : user.photoURL,
          },
          {
            merge: true
          });

          auth.signOut();
    }

    return (
      <Container>
        <Header>
          <UserAvatar src={user.photoURL} />
          <h3>{user.name}</h3>
          <SignOutButton onClick={signOut} > Log Out </SignOutButton>
        </Header>
        <p style={{backgroundColor:'greenyellow',textAlign:'center',
        padding:'5px'}}> Click on user to start chat</p>
  
  

        {/* List Real */}
        {allUserSnapshot?.docs.map((user) => (
          <List key={user.id} id={user.id} user={user.data()} />
        ))}


      </Container>
    )
  }
  
  const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    font-size: 2.2vh;
    min-width: 100px;
    max-width: 400px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
 
  `;
  

  
  const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 70px;
    border-bottom: 1px solid whitesmoke;
    
  @media only screen and (max-width: 500px) {
     padding: 10px;
    width: 100%;
  }
  `;
  
  const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  `;

  const SignOutButton = styled(Button)`
    font-weight: bold !important;
    color: darkred !important;
    
    
    @media only screen and (max-width: 359px) {
     font-size: 8px !important;
     padding-right: 10px !important;
  }
 
  `;