import React, {Component} from 'react';
import axios from 'axios';
// import styled from 'styled-components'
import Tasks from '../components/Tasks/tasks'
import Requests from '../components/Requests/requests'
import {Button} from 'react-bootstrap'
// import {Link, Redirect} from 'react-router-dom'

class UserHomepage extends Component{
   state = {
       user: [],
       viewTasks: false,
       viewRequests: false,
       viewReviews: false,
       task:[],
       request:[]
   }

   componentWillMount(){
    if(localStorage.getItem("thisToken") === "Bearer " || !localStorage.getItem("thisToken")){
        window.location.replace("/login")
    }
   }

   togglePersonHandler = () =>{
    const doesShow = this.state.viewTasks;
    this.setState({viewTasks: !doesShow});
   }


   toggleRequestHandler = () =>{
    const doesShow = this.state.viewRequests;
    this.setState({viewRequests: !doesShow});
   }
   
   componentDidMount(){
    let config = {
        headers: {
        Authorization: localStorage.getItem("thisToken"),
        }
    }

    axios.get('http://localhost:3000/users/me', config, {
    })
    .then((response) => {
      this.setState({user:response.data})
      console.log(this.state.user.name)
    })
    .catch(function (error) {
      console.log(error.message);
      
    });

    axios.get('http://localhost:3000/tasks', config, {
      })
      .then((response) =>{
        this.setState({task:response.data})
      })
      .catch(function (error) {
        console.log(error.message);
        
      });
    
      axios.get('http://localhost:3000/mytasks', config, {
      })
      .then((response) =>{
        this.setState({request:response.data})
      })
      .catch(function (error) {
        console.log(error.message);
        
      });

   }
    
   logOutHandler = () => {
        localStorage.removeItem("thisToken")
        window.location.replace("/")
   }
   


    render (){
        const style = {
            "display" : "flex",
            "flexWrap" : "wrap",
            
          }

        let mytasks = null
        let myRequests = null
    if(this.state.viewTasks){
    mytasks = ( <div style={style}> 
       
        
        <Tasks 
        thetasks = {this.state.task}
        key = {this.state.task.length}
         />
         

    </div>
    )
    }
    if(this.state.viewRequests){
      myRequests = ( <div style={style}> 
         
          
          <Requests 
          thetasks = {this.state.request}
          key = {this.state.task.length}
           />
           
  
      </div>
      )
      }
        return (
         <div>
             <h1>Welcome {this.state.user.name}</h1>
             <h2>{this.state.user.userType}</h2>
             <h3>{this.state.user.occupation}</h3>
             <p>You have {this.state.task.length} new job requests</p>
             <Button onClick={this.togglePersonHandler}>View requests</Button>
             {mytasks}
             <p></p>
             <Button onClick={this.toggleRequestHandler}>View services requested</Button>
             {myRequests}
             <p>log out below</p>
             <Button onClick={this.logOutHandler}>Log Out</Button>
       </div>
        );
        }
    }
        

export default UserHomepage