import styled from "styled-components";
import React, {useState, useRef} from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'; 
import { useRouter } from 'next/router';
import {auth,db} from "../firebaseConfig";
import Message from "./Message";
import firebase from "firebase/compat/app";
import getRecipientEmail from "../utils/getRecipientEmail";

import { Avatar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import TimeAgo from 'timeago-react';


function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    
    const recipientEmail = getRecipientEmail(chat.users, user);
    const endOfMessagesRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail))
  
    const showMessages = () => {
      if(messagesSnapshot) {
        return messagesSnapshot.docs.map(message => (
          <Message 
            key={message.id}
            user={message.data().user}
            message={{
              ...message.data(),
              timestamp : message.data().timestamp?.toDate().getTime()
            }}
          />
        ))
      } else {
        return JSON.parse(messages).map(message => (
          <Message key={message.id} user={message.user} message={message} />
        ))
      }
    }
  
    const sendMessage = (e) => {
      e.preventDefault();
      db.collection("users").doc(user.uid).set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      }, {merge: true})
  
      db.collection("chats").doc(router.query.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
      });
  
      setInput("");
      scrollToBottom();
    }
  
    const scrollToBottom = () => {
      endOfMessagesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log(recipient)

  
    return (
      <Container>
        <Header>
          {recipient ? (
            <Avatar src={recipient?.photoURL} />
          ) : (
            <Avatar>{recipientEmail[0]}</Avatar>
          )}
          <HeaderInformation>
            <h3>{recipient?.name}</h3>
            {recipientSnapshot ? (
              recipient?.online ? 
              <p style ={{color:"#00bd00", fontWeight:'bold'}}> Online </p> :
              <p>Last seen: {' '}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                ) : "Unavailable"}
              </p>
            ) : (
              <p>Loading last active...</p>
            )}
            
          </HeaderInformation>
         
        </Header>
  
        <MessageContainer>
          <EntryMessage>Start your conversation.....👋</EntryMessage>
          {showMessages()}
          <EndOfMessage ref={endOfMessagesRef}/>
        </MessageContainer>
  
        <InputContainer>
          <p>Type <br></br> here </p>
          <Input value={input} onChange={e => setInput(e.target.value)}/>
          <button  disabled={!input} type="submit" onClick={sendMessage}> <SendIcon /> </button>
         
        </InputContainer>
      </Container>
    )
  }
  
  export default ChatScreen;
  
  const Container = styled.div`
   max-width: 100% !important;
  `;
  
  const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
   
    max-width: 100% !important;
  `;
  
  const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;
    > h3 {
      margin-bottom: 3px;
    }
    > p {
      margin-top: 0px;
      font-size: 14px;
      color: gray;
    }
    @media only screen and (max-width: 400px) {
     
     p{
      
       font-size: 12px;
     }
     
  }
 
  `;
  

  
  const EndOfMessage = styled.div`
  `;
  
  const MessageContainer = styled.div`
    padding: 30px;
    background-image: url('../chat-background.jpg') !important;
    min-height: 90vh;
    max-width: 100% !important;
  `;
  
  const Input = styled.input`
    flex: 1;
    padding: 20px;
    bottom: 0;
    background-color: whitesmoke;
    outline: 0;
    border: none;
    border-radius: 10px;
    margin: 0 15px;
    @media only screen and (max-width: 500px) {
    
      width: 50%;
}
  `;
  
  const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
    max-width: 100% !important;
    @media only screen and (max-width: 500px) {

      p{
        font-size: 14px;
        
      }
}
  `;

const EntryMessage = styled.p`
  color: black;
  padding: 7px;
  background-color: #FFFFE0;
  text-align: center;
  font-weight: bold;
`;