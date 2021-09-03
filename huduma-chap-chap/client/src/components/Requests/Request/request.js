import React,{Component} from 'react';
// import './Person.css';
import axios from 'axios';
import './request.css'
import {FaUserAlt, FaCheck} from  'react-icons/fa'
import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import PaymentModal from '../../Modals/paymentmodal'
const StyledDiv = styled.div`

width: 20%;
margin: 16px auto;
border: 1px hidden #eee;
box-shadow: 0 4px 4px black;
display : block;
padding: 16px;
text-align: center;
font-family: Poppins;
transition: ease-in 0.1s;
@media (min-width: 500px){
        width:450px;
    }
&:hover{
  box-shadow: 0 4px 4px white;

    }
`;
class Task extends Component{
   state = {
        id : this.props.id,
        show: false,
        edit: false,

   }
    deleteTask = (props) =>{
        let config = {
            headers:{
              Authorization: localStorage.getItem("thisToken")
            }
          }
     let check = window.confirm("Are you sure you want to delete this task?");
     if(check == true){
        axios.delete('http://localhost:3000/tasks/'+this.props.id , config)
        .then((response) => {
          console.log(response.data)
      
        })
        .catch( (error) => {
          console.log(error.message);
          this.setState({validLogin: false})
          
        });
       
        
    }
     }
    acceptTask = (props) =>{
        let config = {
            headers:{
              Authorization: localStorage.getItem("thisToken")
            }
          }
        const data = {
            accepted: true,
            editOwner: true,
        }
        let check = window.confirm("Are you sure you want to accept this request?")
        if(check == true){
        axios.patch('http://localhost:3000/tasks/'+this.props.id , data, config)
        .then((response) => {
          console.log(response.data)
            this.setState({edit: true});
        })
        .catch( (error) => {
          console.log(error.message);
          
          
        });
       
    }
    }

    
    toggleShow = (props) =>{
        const currShow = this.state.show;
        this.setState({show: !currShow});
    }
    render() {
    const url = "/connect?id=" 
    const todayDate = Date.now()
    console.log(this.props.dueDate)
    const newDate =  new Date(this.props.dueDate)
    let modal1 =[]
    let accepted = null
    if(this.state.show){
        modal1 = (
            <div>
            <PaymentModal id={this.props.id} toShow={this.state.show} />
            </div>
        );
    }
    if(this.props.accepted){
      accepted = "Accepted"
    }
    else{
      accepted = "Pending..."
    }

   return (
   
    <StyledDiv >
        <h2>{this.props.description}</h2>
        <hr className="line"></hr>
        {accepted}
        <hr className="line"></hr>
  <p>Billing Method: {!this.props.billingMethod? "Pending" : this.props.billingMethod} </p> 
    {modal1}
  <p>Hours: {!this.props.hours? "Pending":this.props.hours } </p> 
  <p>Payment Method: {!this.props.paymentMethod? <Button onClick={this.toggleShow}>Add method</Button> : this.props.paymentMethod} </p> 
   <p>Due Date : {Math.floor((newDate- todayDate)/(1000*3600*24))} days</p>
   <p>Details: {this.props.message}</p>
   <Button className="btn-success" onClick={this.acceptTask}> Confirm <FaCheck/></Button>{" "}
   <Button className="btn-danger" onClick={this.deleteTask} disabled={this.props.edit}>Reject</Button>
   

   </StyledDiv> 
   
   );
   }
}

export default Task;