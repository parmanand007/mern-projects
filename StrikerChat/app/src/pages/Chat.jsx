import axios from 'axios'
import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { allUserRoute,host } from '../utils/APIRoutes'
import Contact from '../components/Contact'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from "socket.io-client"
const Chat = () => {
const [contacts,setContacts]=useState([])
const [currentUser,setCurrentUser]=useState(undefined)
const navigate=useNavigate()
const [currentChat,setCurrentChat]=useState(undefined)
const [isLoaded,setIsLoaded] =useState(false )
const socket =useRef()

const getCurrentUser= async()=>{
  
  const currUser= await JSON.parse(localStorage.getItem("chat-app-user"))
  setCurrentUser(currUser)
  console.log("getCurrent user",currentUser)
  console.log("getCur= user",currUser)
  console.log("getCurrent againn user",currentUser)
  
}
useEffect(()=>{
  console.log()
   if(!localStorage.getItem("chat-app-user")){
    navigate("/login");  
   }
   else{
    getCurrentUser();
    setIsLoaded(true)
    console.log("useeffect get current user ",currentUser)
  }
  
  
},[])

useEffect(()=>{
  if(currentUser){
    socket.current= io(host)
    socket.current.emit("add-user",currentUser._id)
  }
},[currentUser])

const getAllUsers= async(currentUser)=>{
  const data=await axios.get(`${allUserRoute}/${currentUser._id}`);
  setContacts(data.data)
  console.log("getAll user",data)
}

useEffect(()=>{
  if(currentUser){
    if(currentUser.isAvatarImageSet){
      getAllUsers(currentUser);

    }else{
      navigate("/setAvatar");
    }
  }
},[currentUser])

const handleChatChange =(chat)=>{
  setCurrentChat(chat)
}

return (
  <Container>
      {console.log("render get current user ",currentUser)}
    <div className="container">
       <Contact contacts= {contacts} currentUser={currentUser} changeChat={handleChatChange}/>
      {
        isLoaded ||
        currentChat ===undefined?
        <Welcome currentUser={currentUser}/>:(
          <ChatContainer 
          socket={socket}          
          currentChat={currentChat} currentUser={currentUser} />

        ) 
      }
      </div>    
     </Container>
  )
}

const Container = styled.div`
height:100vh ;
width: 100wh;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items: center;
.container{
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns: 35% 65%;
  }
}
`
export default Chat
