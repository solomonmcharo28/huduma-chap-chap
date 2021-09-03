import React, {Component, isValidElement} from 'react';
import axios from 'axios';
import validator from 'validator';
import './formClasses.css'
import styled from 'styled-components'
import Input from '../UI/Input/input.js';
import {Form , Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'

class TaskForm extends Component{
  state = {
    taskForm:{
      description:{
        elementType: "textarea",
        elementConfig:{
          type:'text',
          placeholder:'Name of Task',
          id:"task"
        },
        value: '',
        label: 'Task',
        validation: {
           required:true,
            minLength:5
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
            minLength:2
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
      dueDate: {
          elementType: "input",
          elementConfig:{
          type:'date',
          id:"date"
        },
        value: '',
        label: 'Due Date',
        validation: {
          required:true,
          
       },
       valid:false,
       touched: false,
       errors:[]
      },
      message:{
        elementType: "textarea",
        elementConfig:{
          type:'text',
          placeholder:'Your Message',
          id:"message"
        },
        value: '',
        label: 'Message',
        validation: {
           required:true,
           
        },
        valid:false,
        touched: false,
        errors:[]
        
      }

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
        this.setState({loggedInPerson:response.data})
        console.log(this.state.loggedInPerson);      


        this.state.taskForm.name.value = this.state.loggedInPerson.name;
        this.state.taskForm.email.value = this.state.loggedInPerson.email;
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
    if(rules.isEmail){
      isValid = validator.isEmail(value)  && isValid ;
      if(!isValid && value.trim()!== ''){
        element.errors.push("Must be a Valid Email")
        }
  }

    return isValid
  }
  inputChangedHandler = (event, inputIdentifier) =>{
   const updatedCreateForm = {
     ...this.state.taskForm
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
   this.setState({taskForm: updatedCreateForm, formisValid });
  }

  onSubmit = (props) =>{ 
    props.preventDefault();
    let dueDate = new Date(this.state.taskForm.dueDate.value);
    let url = window.location.search;
    url = url.split("=")[1]
    const name = this.state.taskForm.name.value;
    const description = this.state.taskForm.description.value;
    const email = this.state.taskForm.email.value;
    const owner = this.state.person._id;
    const message = this.state.taskForm.message.value;
    const sender = this.state.loggedInPerson._id;
    console.log(owner);
    const data = {
      name,
      dueDate,
      description,
      email,
      owner,
      message,
      sender
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
    for(let key in this.state.taskForm){
      formElementsArray.push({
        id: key,
        config:this.state.taskForm[key]
      })

    }
    return (
     //    <div className="Person" >
     <div>
       <div className="userInfo">
         <img></img>
         <h3> {this.state.person.name}</h3>
         <h4>{this.state.person.occupation}</h4>
       <div className={divStyle}>Description: <p>{this.state.person.description}</p></div>
       <h4>Education: {this.state.person.education}</h4>
       <h4>Experience: {this.state.person.experience}</h4>
       <p></p> 
       </div>
       <br></br>
     <form id='myForm'
            className="taskForm"
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
     {this.state.loggedIn? <Redirect to="/" /> : console.log("")}
   </form>
  
   </div>
    );
    }
 }
 
 export default TaskForm;