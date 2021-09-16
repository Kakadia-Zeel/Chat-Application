import React from 'react'
import Head from 'next/head';
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth'; 

function Chat({ chat, messages}) {
    const [user] = useAuthState(auth);
  
    return (
      <Container >
        <Head>
          <title>Chat</title>
        </Head>
        <Sidebar />
        <ChatContainer>
          <ChatScreen chat={chat} messages={messages}/>
        </ChatContainer>
      </Container >
    )
  }
  
  export default Chat;
  
  export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);
  
    // Prepare the messages on the server
    const messageRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();
    const messages = messageRes.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).map(messages => ({
      ...messages,
    //   timestamp: messages.data().timestamp.toDate().getTime()
    }))
  
    // Prepare the chats
    const chatRes = await ref.get();
    const chat = { 
      id: chatRes.id,
      ...chatRes.data()
    }
  
    return {
      props: {
        messages: JSON.stringify(messages),
        chat: chat
      }
    }
  }
  
  const Container = styled.div`
    display: flex;
  `;
  
  const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms--ms-overflow-style: none;
    scrollbar-width: none;

 

  `;