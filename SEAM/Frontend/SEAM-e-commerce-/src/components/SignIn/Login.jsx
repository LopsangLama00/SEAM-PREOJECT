
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from "../AxiosRequests/BaseUrl";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import NavScrollExample from '../Navbar';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';


export default function loginFunction() {
  const navigate = useNavigate();

  const [errors, SetErrors] = useState({
    email:"",
    password : ""
  })

  const [loginDetails,setLoginDetails] = useState({
    email:"",
    password:""
  })

  const handleChange = (e)=>{
  setLoginDetails((prev)=>{
    return{
      ...prev,
      [e.target.name] : e.target.value
    }
  }) 
  }
  const handleSubmit = async(e,values)=>{

    if(values.email.length== 0){
    SetErrors((prev)=>{
      return {
        ...prev,
        email:"Email is required"
      }
    })
    }
    else if (values.password.length == 0){
      SetErrors((prev) => {
        return {
          ...prev,
          password : "password is required"
        }
      })
    }
    else{
    axios.post("/login",values).then((res) => {
    console.log(res)
    toast.success("Login successfully")
    setTimeout(()=>{
      navigate("/")
      },1000)
    }).catch((error) => {
      if(error.response.status==401){
        
        toast.error("email or password incorrect")
      }
      else if(error.response.status==500){
        
        toast.error("Something went wrong")
      }
    }) 
    }
  e.preventDefault()
  }
return (
  <>

  <div className="container w-50 mt-5 shadow p-3" >
      <ToastContainer/>
      <h4 className="text-center fw-bold mt-4"> Login Page</h4>
      <Form onSubmit={(e)=>handleSubmit(e,loginDetails)} noValidate>
        <Form.Group  className="mb-3 p-4" controlId="formPlaintextEmail">
          <Form.Label >
            Email
          </Form.Label>
          <Form.Control type="email" placeholder="email@example.com"  name="email" onChange={handleChange} value={loginDetails.email}/>
          <p className="text-danger">{errors.email} </p>
        </Form.Group>
        <Form.Group  className="mb-3 p-4" controlId="formPlaintextPassword">
          <Form.Label>
            Password
          </Form.Label>

          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={loginDetails.password}/>
          <p> {errors.password} </p>
        </Form.Group>
        <Button variant="outline-primary" type='submit'>Login</Button>{' '}
      </Form>

      <span className="text-center mt-5"> Don't have an account ? <Link to="/register" > click here </Link></span>
    </div>
    </>
  );
}

