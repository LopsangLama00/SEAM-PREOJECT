import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import React, {  useState } from 'react';
import axios from '../AxiosRequests/BaseUrl';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer ,toast} from 'react-toastify';
import NavScrollExample from '../Navbar';
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const [error, SetError] = useState ({
    firstName:"",
    lastName: "",
    email:"",
    password:"",
    password2:""
  })
  const [RegDetails, SetRegDetails] = useState({
    firstName:"",
    lastName: "",
    email:"",
    password:"",
    password2:""
  })

  const handleChange = (e) => {
    SetRegDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  
  const handleSubmit = async(e,values) => {
        if (values.password !== values.password2) {
          SetError((prev) =>{
            return {
              ...prev,
              password2: "Passwords doesn't Match"
            }
          })  
        }
        else if(values.password === 0){
          SetError((prev) =>{
            return {
              ...prev,
              password: "Password is required"
            }
          })
        }
        else if(values.password2 === 0){
          SetError((prev) =>{
            return {
              ...prev,
              password2: "Password2 is required"
            }
          })
        }
        else if(values.firstName === 0){
          SetError((prev) =>{
            return {
              ...prev,
              firstName: "First Name is required"
            }
          })
        }
        else if(values.lastName === 0){
          SetError((prev) =>{
            return {
              ...prev,
              lastName: "Last Name is required"
            }
          })
        }
        else if(values.email === 0){
          SetError((prev) =>{
            return {
              ...prev,
              email: "Email is required"
            }
          })
        }
        else
        axios.post("/UserData",values).then((res) => {
          console.log(res)
          toast.success("Registration Successful")
          setTimeout(()=>{
            navigate("/")
          },1000)
        }).catch ((error) => {
        
        console.log(error.message)
        if(error.response.status == 400 ){
          toast.error("Bad Request")
        }
        else if(error.response.status == 500){
          toast.error("Something went wrong")
        }
        
      })
      

      
  e.preventDefault();

  }

  

  return (
    <>
 
    <div className="container shadow p-3 mt-5 justify-content-center p-5" >

    <ToastContainer/>
      <h4 className="text-center fw-bold"> User Registration</h4>

      <Form onSubmit={(e) => handleSubmit(e,RegDetails)} >
        <Form.Group as={Row} className="mb-3" controlId="fName">
          <Form.Label >
            First Name
          </Form.Label>
          <Form.Control type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={RegDetails.firstName} />
          <p className="text-danger">{error.firstName}</p>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 " controlId="lName">
          <Form.Label >
            Last Name
          </Form.Label>
          <Form.Control type="Text" placeholder="Last Name" name="lastName" onChange={handleChange} value={RegDetails.lastName} />
          <p className="text-danger">{error.lastName}</p>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="UserEmail">
          <Form.Label >
            Email
          </Form.Label>
          <Form.Control type="email" placeholder="email@example.com" name="email"  onChange={handleChange} value={RegDetails.email}/>
          <p className="text-danger">{error.email}</p>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Password">
          <Form.Label >
            Password
          </Form.Label>
          <Form.Control type="password" placeholder="Password" name="password"  onChange={handleChange} value={RegDetails.password}/>
          <p className="text-danger">{error.password}</p>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="ConfirmPassword">
          <Form.Label >
            Confirm Password
          </Form.Label>
          <Form.Control type="password" placeholder=" Confirm Password" name="password2" onChange={handleChange}  value={RegDetails.password2}/>
          <p className="text-danger">{error.password2}</p>
        </Form.Group>
        <Button variant="outline-primary" type='submit'>Register</Button>{' '}
      </Form>
    </div>
 
    </>
  );
}

export default Register;