import React, {Component} from 'react';
import axios from 'axios';
// import './Person.css';
import './formClasses.css'
import styled from 'styled-components'
import Input from '../UI/Input/input.js';
import {Form , Button} from 'react-bootstrap'
class LoginForm extends Component{
  state = {
    loginForm:{
      email: {
        elementType: "input",
        elementConfig:{
          type:'email',
          placeholder:'example@email.com',
          id:"email"
        },
        value: '',
        label: 'Email'

      },
      password: {
        elementType: "input",
        elementConfig:{
        type:'password',
        placeholder:"password",
        id:"password"
        },
      value: '',
      label: 'Password'
      },
      
    },
    validLogin:true,

  }
  inputChangedHandler = (event, inputIdentifier) =>{
    const updatedCreateForm = {
      ...this.state.loginForm
    };
    const updatedFormElement = {
      ...updatedCreateForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value
    updatedCreateForm[inputIdentifier] = updatedFormElement
    this.setState({loginForm: updatedCreateForm});
   }
   
  onSubmit = (props) =>{ 
    props.preventDefault();
    
    const email = this.state.loginForm.email.value;
    const password = this.state.loginForm.password.value;
    console.log(email);
    const data = {
      email,
      password
    }
    axios.post('http://localhost:3000/users/login', data)
    .then((response) => {
      console.log(response.data);
      const token = "Bearer " + response.data.token
      localStorage.setItem('thisToken', token)
      console.log(token)
      window.location.replace("/homepage")
    })
    .catch( (error) => {
      console.log(error.message);
      this.setState({validLogin: false})
      
    });
   
    
}

render (){
  let invalidLogin = null;
  if(!this.state.validLogin){
    invalidLogin = (
      <p className="invalidLogin">Invalid Username/Password</p>
    )
  }
  
  const formElementsArray = [];
    for(let key in this.state.loginForm){
      formElementsArray.push({
        id: key,
        config:this.state.loginForm[key]
      })

    }
    return (

     <div className="login">
    
         <h1>Login</h1>
     <form  id='myForm'
            className="form"
              >
    {formElementsArray.map(formElement =>(
       <Input
            key={formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            label = {formElement.config.label}
            changed = {(event) => this.inputChangedHandler(event, formElement.id )}
       />
     ))}
     {invalidLogin}
     <Button variant="primary" type="submit" onClick={this.onSubmit}>
       Submit
     </Button>
     
   </form>
   </div>
    );
    }
}
 
 export default LoginForm;