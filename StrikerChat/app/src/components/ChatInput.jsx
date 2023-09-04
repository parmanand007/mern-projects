import React, { useState } from 'react'
import {BsEmojiSmileFill} from "react-icons/bs"
import {IoMdSend} from "react-icons/io"
import styled from "styled-components"
// import Picker from "emoji-picker-react"
import EmojiPicker from 'emoji-picker-react';

const ChatInput = ({handleSendMsg}) => {
 const [showEmojiPicker,setshowEmojiPicker]= useState(false);
 const [msg,setMsg]=useState("")
const handleEmojiPickerHideShow = ()=>{
    setshowEmojiPicker(!showEmojiPicker)
}
const handleEmojiClick = (emoji)=>{
    let message = msg;
    message+= emoji.emoji;
    setMsg(message)
}
const sendChat = (event)=>{
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg)
        setMsg('')
        
    }
}

  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                {
                    showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form className="input-container"
        onSubmit={(e)=>sendChat(e)}
        >
             
            
            <input type="text" placeholder='type your message here' 
            value={msg}
            onChange={(e)=>setMsg(e.target.value)} 
            />
            <button className="submit">
                <IoMdSend />
            </button>
            
            </form>
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
/* background-color: #ffffff39; */
padding:0rem 2rem;
padding-bottom:0.3rem;
@media screen and (min-width:720px) and (max-width:1080px){
   padding:0 1rem;
   gap:1rem;
  }
.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap:1rem;
    .emoji{
        position: relative;
        svg{
            font-size:1.5rem;
            color:#ffff00c8;
            cursor:pointer;
        }
        .EmojiPickerReact{
            position: absolute;
            top:-470px;
            background-color: #ffffff39;
            box-shadow: 0 5px 10px grey;
            border-color:grey;
         .emoji-scroll-wrapper::-webkit-scrollbar{
            background-color: #ffffff39;
         }
        }
    }
}
.input-container{
    width: 100%;
    height: 100%;
    border-radius:2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    background-color:#ffffff39;
    /* #ffffff39 */
    input{
        width: 90%;
        height: 60%;
        background-color: transparent;
        color:white;
        border:none;
        padding-left:1rem;
        font-size:1.2rem;
        &::selection{
            background-color:#9186f3;

        }
        &:focus{
            outline:none;

        }
    }
        button{
            padding:1rem;
            background-color:#ffffff39;
            color:white;
            border:none;  
            border-radius:20%;
            @media screen and (min-width:720px) and (max-width:1080px){
              padding: 0.3rem 1rem;
              svg{
                font-size: 1rem;

              }
    }
        }

}
`
export default ChatInput