import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup(){
  
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
    
    const handleSubmit = async (e)=>{
        //synthetic event preventDefault
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
      });
      const json = await response.json()
      console.log(json)
      if(!json.success){
           alert("Enter valid credentials")
      }
    } 
    
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
        
      }
      
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={credentials.name}
              onChange={onChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>
            
            <button type="submit" className="btn btn-primary mt-3">
                Submit
            </button>
            
            <Link to ="/login" className="btn btn-danger mt-3">Already a User</Link>
        </form>
      </div>
    </>
  );
};


