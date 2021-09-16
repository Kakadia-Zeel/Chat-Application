import React from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { Avatar, Tooltip } from "@material-ui/core";
// import CircleIcon from "@material-ui/icons/ci";

function List({ id, user }) {
  const [loggedUser] = useAuthState(auth);
  const router = useRouter();

  const userChatRef = db.collection("chats");
  const [chatsSnapshot] = useCollection(userChatRef);

  const enterChat = () => {
    const generatedId = createChat();
    router.push(`/chat/${generatedId}`);
  };

  const createChat = () => {
    let generatedId = "";
    if (loggedUser.uid < id) {
      generatedId = loggedUser.uid + id;
    } else generatedId = id + loggedUser.uid;

    if (!chatAlreadyExist(generatedId))
      db.collection("chats")
        .doc(generatedId)
        .set({
          users: [loggedUser.email, user.email],
        });

    return generatedId;
  };

  const chatAlreadyExist = (generatedId) => {
    return !!chatsSnapshot?.docs.find((chat) => chat.uid === generatedId);
  };

  return (
    <Container onClick={enterChat}>
      <UserAvatar src={user?.photoURL} />
      <UserDetail>
        {user.name}
      </UserDetail>
      <Status>
          {user.online === true ? (
            <Tooltip title="Online">
            <span style={{ color: "#00bd00" }}>●</span>
            </Tooltip>
          ) : (
            <Tooltip title="Offline">
            <span style={{ color: "red" }}>●</span>
            </Tooltip>
          )}
        </Status>
    </Container>
  );
}

export default List;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: powderblue;
    font-weight: bold;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;

  @media only screen and (max-width: 500px) {
     display: none !important;
  }
 
`;

const UserDetail = styled.div`
  justify-content: center; 

  
  @media only screen and (max-width: 700px) {
      font-size: 15px;
  }

`;

const Status = styled.span`
  padding-left: 5px;
  right: 0px;
`;
