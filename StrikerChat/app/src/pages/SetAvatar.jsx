import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import styled from "styled-components"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer/';
const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945"
  const navigate = useNavigate()
  const [avatars,setAvatars]=useState([]);
  const [isLoading,setisLoading]=useState(true)
  const [selectedAvatar,setSelectedAvatar] = useState([])
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  function randomNumber(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  }
  
     
  let data = []
  const fetchRandomAvatar = async () => {
   
        try {
            while (data.length < 4){
                const image = await axios.get(`${api}${randomNumber(10)}`)
                const buffer = new Buffer(image.data)
                
                data.push(buffer.toString("base64"))
            }
        
        // for(let i=0;i<4;i++){
           
        //     if(data.length==3) break
        // }

      } catch (error) {
          
        console.error('Error fetching avatar:', error);
      }
    

    setAvatars(data);
    setisLoading(false);
  };


const setProfilePicture =async()=>{};
useEffect(()=>{
    
    fetchRandomAvatar();
    console.log("inside useeffect",data)
},[])
  return (
        <>
        
   <Container>
   <div className="title-container">
    <h1>Pick an avatar as your profile picture</h1>
   </div>
  <div className="avatars">
{
    avatars.map((avatar,index) =>{
   
        return (
            <div
            key={index} 
            className={`avatar ${
                selectedAvatar === index ? "selected": ""
            }`}
            >
                <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={()=>setSelectedAvatar(index)}                
                />

            </div>
        )
    })
}
  </div>
   </Container>
   <ToastContainer />
   </>
  )
}

const Container = styled.div``;

export default SetAvatar;