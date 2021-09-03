import React, {Component, isValidElement} from 'react';
import axios from 'axios';
import validator from 'validator';
import styled from 'styled-components'
import Input from '../UI/Input/input.js';
import {Form , Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'

class CreateForm extends Component{
  state = {
    createForm:{
      name:{
        elementType: "input",
        elementConfig:{
          type:'text',
          placeholder:'Your Name',
          id:"name"
        },
        value: '',
        label: 'Name',
        validation: {
           required:true,
           
        },
        valid:false,
        touched: false

      },
      email: {
        elementType: "input",
        elementConfig:{
          type:'email',
          placeholder:'example@email.com',
          id:"email"
        },
        value: '',
        label: 'Email',
        validation: {
          required:true,
          isEmail: true,
          
       },
       valid:false,
       errors:[]
       

      },
      userType: {
        elementType: "select",
        elementConfig:{
          options: [
            {value:'', displayValue:''},
            {value:'Service Provider', displayValue:'Service Provider'},
            {value:'Employer', displayValue:'Employer'},
            {value:'HR Manager', displayValue:'Human Resource Manager'}
          ],
          placeholder:'Your Name',
          id:"userType",
          
        },
        validation: {
          required:true,
          
       },
       valid:false,
        value:'',
        label: 'User Type',
        touched: false,
        errors:[]

      },
      occupation: {
        elementType: "select",
        elementConfig:{
          options: [
            {value:'', displayValue:''},
            {value:'Mechanic', displayValue:'Mechanic'},
            {value:'Carpenter', displayValue:'Carpenter'},
            {value:'Electrician', displayValue:'Electrician'},
            {value:'BlackSmith', displayValue:'BlackSmith'},
            {value:'Lawyer', displayValue:'Lawyer'},
            {value:'Driver', displayValue:'Driver'},
            {value:'Self-Employed', displayValue:'Self-Employed'},
            {value:'Private Sector Worker', displayValue:'Private Sector Worker'},
            {value:'Government Official/Company', displayValue:'Government Official/Company'}
          ],
          
          id:"occupation",
          
        },
        validation: {
          required:true,
          
       },
       valid:false,
        value:'',
        label: 'Occupation',
        touched: false,
        errors:[]
        },
      birthdate: {
          elementType: "input",
          elementConfig:{
          type:'date',
          id:"date"
        },
        value: '',
        label: 'BirthDate',
        validation: {
          required:true,
          
       },
       valid:false,
       touched: false,
       errors:[]
      },
      password: {
        elementType: "input",
        elementConfig:{
        type:'password',
        placeholder:"password",
        id:"password"
        },
      value: '',
      label: 'Password',
      validation: {
        required:true,
        minLength:8,

        
     },
     valid:false,
     touched: false,
     errors:[]
      },
      comfirmpassword: {
        elementType: "input",
        elementConfig:{
        type:'password',
        placeholder:"confirm password"
        },
      value: '',
      label: 'Confirm Password',
      validation: {
        required:true,
        confirmPassword: true,
        
     },
     valid:false,
     touched: false,
     errors:[]
      },

    },
    formisValid: false,
    loggedIn : false

  }
  checkValidity(value, rules, element){
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !=='' && isValid;
      if(!isValid){
      element.errors.push("This field must not be empty")
      }
  }
  if(rules.minLength){
    const minChar = rules.minLength
    isValid = value.length >= rules.minLength && isValid;
    const errorMessage = "Input must be " + minChar + " characters long"
    if(!isValid && value.trim()!== ''){
      element.errors.push(errorMessage)
      }
  }
  if(rules.isEmail){
    isValid = validator.isEmail(value)  && isValid ;
    if(!isValid && value.trim()!== ''){
      element.errors.push("Must be a Valid Email")
      }
}
    if(rules.confirmPassword){
      isValid = value === this.state.createForm.password.value && isValid
      if(!isValid && value.trim()!== ''){
      element.errors.push("Passwords Must Match")
      }
    }

    return isValid
  }
  inputChangedHandler = (event, inputIdentifier) =>{
   const updatedCreateForm = {
     ...this.state.createForm
   };
   const updatedFormElement = {
     ...updatedCreateForm[inputIdentifier]
   };
   updatedFormElement.errors = []
   updatedFormElement.value = event.target.value
   updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, updatedFormElement)
   updatedFormElement.touched = true
   console.log(updatedFormElement)
   updatedCreateForm[inputIdentifier] = updatedFormElement
   let formisValid = true; 
   for(let inputIdentifier in updatedCreateForm){
     formisValid = updatedCreateForm[inputIdentifier].valid && formisValid
   }
   this.setState({createForm: updatedCreateForm, formisValid });
  }

  onSubmit = (props) =>{ 
    let todayDate = Date.now();
    let newDate = new Date(this.state.createForm.birthdate.value);
    props.preventDefault();
    
    const name = this.state.createForm.name.value;
    const userType = this.state.createForm.userType.value;
    const occupation = this.state.createForm.occupation.value;
    const age = Math.floor((todayDate - newDate)/(1000*3600*24*365));
    const email = this.state.createForm.email.value;
    const password = this.state.createForm.password.value;
    console.log(age);
    const data = {
      name,
      occupation,
      userType,
      age,
      email,
      password
    }
    console.log(data)
    axios.post('http://localhost:3000/users', data)
    .then( (response) => {
      console.log(response.data);
      this.setState({loggedIn: true});
    })
    .catch((error) => {
      console.log(error);
      
    });
  }


  render(){
    const formElementsArray = [];
    for(let key in this.state.createForm){
      formElementsArray.push({
        id: key,
        config:this.state.createForm[key]
      })

    }
    return (
     //    <div className="Person" >
     <div className="register">
       
         <h1>Registration</h1>
         <hr className="line"></hr>
     <Form id='myForm'
            className="form"
            ref= { form => this.messageForm = form }
            onSubmit={ this.onSubmit.bind( this )}>
     {formElementsArray.map(formElement =>(
       <Input
            key={formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            label = {formElement.config.label}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            changed = {(event) => this.inputChangedHandler(event, formElement.id )}
            touched= {formElement.config.touched}
            errors = {formElement.config.errors}
       />
     ))}
     
     <Button variant="primary" type="submit" disabled={!this.state.formisValid}>
       Submit
     </Button>
     {this.state.loggedIn? <Redirect to="/login" /> : console.log("")}
   </Form>
   </div>
    );
    }
 }
 
 export default CreateForm;