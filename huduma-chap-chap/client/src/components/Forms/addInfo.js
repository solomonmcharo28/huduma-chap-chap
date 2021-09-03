import React, {Component, isValidElement} from 'react';
import axios from 'axios';
import validator from 'validator';
import styled from 'styled-components'
import Input from '../UI/Input/input.js';
import {Form , Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'

class addInfo extends Component{
  state = {
    addInfo:{
      description:{
        elementType: "textarea",
        elementConfig:{
          type:'text',
          placeholder:'Name of Task',
          id:"task"
        },
        value: '',
        label: 'Description',
        validation: {
           required:true,
           
        },
        valid:false,
        touched: false,
        errors:[]

      },
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
      education: {
        elementType: "select",
        elementConfig:{
          options: [
            {value:'', displayValue:''},
            {value:'High School Certificate', displayValue:'High School Certificate'},
            {value:'Diploma', displayValue:'Diploma'},
            {value:'Associates', displayValue:'Associates'},
            {value:'Bachelors', displayValue:'Bachelors'},
            {value:'Masters', displayValue:'Master'},
            {value:'Doctorate', displayValue:'Doctorate'},
            

          ],
          placeholder:'Education',
          id:"userType",
          
        },
        value: '',
        label: 'Education',
        validation: {
        required:true,
        
        },
        valid:false,
        touched: false
    },
        yearsExperience:{        
            elementType: "input",
            elementConfig:{
                type:'Number',
                placeholder:'years of experience',
                id:"name"
            },
            value: '',
            label: 'Years of Experience',
            validation: {
            required:true,
            
            },
            valid:false,
            touched: false


        },
            },
    person:{},
    formisValid: false,
    loggedIn : false,
    loggedInPerson : {

    },

  
}
  componentDidMount(){
    let url = window.location.search;
    url = url.split("=")[1]
    axios.get('http://localhost:3000/users/'+url).then(response =>{
        this.setState({person:response.data})
        console.log(this.state.person);
     });
     
     
     if(localStorage.getItem("thisToken") !== "Bearer " && localStorage.getItem("thisToken")){
        let config = {
            headers:{
                Authorization: localStorage.getItem("thisToken") 
            }
        }
        axios.get('http://localhost:3000/users/me',config).then(response =>{
        this.setState({person:response.data, loggedIn: true})
        console.log(this.state.loggedInPerson);
        this.state.addInfo.description.value = this.state.person.description;
     });
        
    }

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
      if(!isValid){
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
      isValid = value === this.state.addInfo.password.value && isValid
      if(!isValid){
      element.errors.push("Passwords Must Match")
      }
    }
    return isValid
  }
  inputChangedHandler = (event, inputIdentifier) =>{
   const updatedCreateForm = {
     ...this.state.addInfo
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
   this.setState({addInfo: updatedCreateForm, formisValid });
  }

  onSubmit = (props) =>{ 
    props.preventDefault();

    const name = this.state.addInfo.name.value;
    const description = this.state.addInfo.description.value;
    const email = this.state.addInfo.email.value;
    const owner = this.state.person._id;
    const message = this.state.addInfo.message.value;
    console.log(owner);
    const data = {
      name,
      description,
      email,
      owner,
      message
    }
    console.log(data)
    axios.post('http://localhost:3000/thetasks', data)
    .then( (response) => {
      console.log(response.data);
      this.setState({loggedIn: true});
    })
    .catch((error) => {
      console.log(error);
      
    });
  }


  render(){
      const divStyle = {
          "width":"400px",
           "height":"80px",
           "wordWrap": "breakWord"
      }
    const formElementsArray = [];
    for(let key in this.state.addInfo){
      formElementsArray.push({
        id: key,
        config:this.state.addInfo[key]
      })

    }
    return (
     //    <div className="Person" >
     <div>
         <h1>Update Your Information</h1>
        
     <form id='myForm'
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
    
   </form>
  
   </div>
    );
    }
 }
 
 export default addInfo;