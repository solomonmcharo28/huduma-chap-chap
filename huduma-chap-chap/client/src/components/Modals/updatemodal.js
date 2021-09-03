import React, {Component} from 'react';
// import './Person.css';
import {FaUserAlt, FaCheck} from  'react-icons/fa'
import axios from 'axios'
import styled from 'styled-components'
import Input from '../UI/Input/input';
import {Button, Modal, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class UpdateModal extends Component{  
    state={
        updateForm:{
          billingMethod: {
            elementType: "select",
            elementConfig:{
              options: [
                {value:'', displayValue:''},
                {value:'Hourly', displayValue:'Hourly'},
                {value:'One-Time Fee', displayValue:'One-Time Fee'},
                {value:'Purchase', displayValue:'Purchase'}
              ],
              id:"billing"
            },
            value: '',
            label: 'Billing Method'
    
          },
          hours: {
            elementType: "input",
            elementConfig:{
            type:'number',
            placeholder:"estimated hours",
            id:"hours"
            },
          value: '',
          label: 'Hours',
          hidden: false,
          },
          
        },
        task :{},
        show : true,
        open : false,
    }
        componentDidMount(){
            const myId = this.props.id;
        }
      handleClose = (props) => {
        
        this.setState({show:false});
        this.setState({open:false});
        }
        handleOpen = (props) => {
        
          this.setState({open:true});
          this.setState({show:true});
       }
       inputChangedHandler = (event, inputIdentifier) =>{
        const updatedCreateForm = {
          ...this.state.updateForm
        };
        const updatedFormElement = {
          ...updatedCreateForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value
        updatedCreateForm[inputIdentifier] = updatedFormElement
        this.setState({updateForm: updatedCreateForm});
       }
       onSubmit = (props) =>{ 
        props.preventDefault();
        
        const billingMethod = this.state.updateForm.billingMethod.value;
        const hours = this.state.updateForm.hours.value;
        const data = {
          billingMethod,
          hours
        }
        let config = {
          headers:{
            Authorization: localStorage.getItem("thisToken")
          }
        }
        axios.patch('http://localhost:3000/tasks/'+this.props.id , data, config)
        .then((response) => {
          console.log(response.data)
      
        })
        .catch( (error) => {
          console.log(error.message);
          this.setState({validLogin: false})
          
        });
       
        
    }
     
   
 
    render(){
      const formElementsArray = [];
    for(let key in this.state.updateForm){
      formElementsArray.push({
        id: key,
        config:this.state.updateForm[key]
      })

    }

      return(
    <Modal show={this.state.open == false ? this.state.show : this.state.show} onHide={this.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update the Request</Modal.Title>
    </Modal.Header>
    <Modal.Body><Form id='myForm'
            className="form">
    <div>
    {formElementsArray.map(formElement =>(
       <Input
            key={formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            label = {formElement.config.label}
            changed = {(event) => this.inputChangedHandler(event, formElement.id )}
       />
     ))}</div>
     </Form></Modal.Body>
    
    <Modal.Footer>
      <Button variant="secondary" onClick={this.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={this.onSubmit}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
    );
    }
    }

export default UpdateModal;