import { formatISO9075 } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

const PostPage = () => {
   const [postInfo,setPostInfo]=useState(null)
   const {userInfo} =useContext(UserContext)
    const {id} =useParams()
    useEffect(()=>{
    
    fetch(`http://localhost:4000/post/${id}`).then(response=>{
        response.json().then(postInfo =>{
   setPostInfo(postInfo) 
        })
    })
 },[])

 if(!postInfo)return "";
  return (
      <div className='post-page'>
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">by {postInfo.author.username}</div>
        {userInfo.id === postInfo.author._id &&(
            <div className="edit-row">
                <Link className='edit-btn' to ={`/edit/${postInfo._id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                </svg>
                </Link>
                Edit this post
            </div>
        )}
        <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} />
    </div>
    <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content }}  /> 
    </div>

  )
}

export default PostPage