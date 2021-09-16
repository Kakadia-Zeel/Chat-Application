import { Button } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebaseConfig';

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <head>
                <title>Login</title>
            </head>
            
           <LoginContainer>
           <Header>
                Chat Application
            </Header>
               <Logo src="https://s3.amazonaws.com/media.thecrimson.com/photos/2021/04/20/015804_1350055.gif"/>
               <Button onClick={signIn}
               variant="outlined">Sign in with Google </Button> 
                       
           </LoginContainer>
           
           <Footer>
               Created by Zeel Kakadia 
               </Footer>
        </Container>
    )
}

export default Login


const Container = styled.div`
display:grid;
place-items: center;
height: 100vh;
position: relative;
background-image : url('https://cdn.dribbble.com/users/1162077/screenshots/4318436/media/1e17490dd92ca27c4a6274ab7bff5b11.png?compress=1&resize=800x600')
`;


const LoginContainer = styled.div`
padding: 10px;
border-radius: 12px;
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
position: relative;

`;

const Logo = styled.img`
height: 300px;
width: 300px;
min-width: 100px;
min-height: 100px;
margin-bottom: 50px;
margin-top: 10px;
`;

const Header = styled.div`
    color: white;
    background-color: red;
    top: 0px;
    width: 100%;
   
    font-size: larger;
    font-style: italic;
    text-align: center;
    padding: 10px;
    font-weight: bold;
    position: absolute;
    
`;


const Footer = styled.div`
    color: white;
    background-color: red;
    margin-top: 100px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    font-style: italic;
    text-align: center;
    padding: 10px;
    font-weight: bold;
    
`;

