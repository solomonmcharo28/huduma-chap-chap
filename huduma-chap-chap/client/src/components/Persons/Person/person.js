import React from 'react';
// import './Person.css';
import {FaUserAlt, FaCheck} from  'react-icons/fa'
import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const StyledDiv = styled.div`
width: 20%;
margin: 16px auto;
border: 1px solid #eee;
box-shadow: 0 2px 3px #ccc;
padding: 16px;
text-align: center;
border-radius:5px;
font-family: Quicksand;
transition: ease-in 0.1s;
@media (min-width: 500px){
        width:450px;
    }
&:hover{
   box-shadow: 0 2px 3px grey;
   background-color: grey;
    }
`;
const Person = (props) => {
    
    const url = "/connect?id=" 
    
   return (
   
    <StyledDiv >
        <h2>{props.occupation}</h2>     
   <p >{props.name}</p>
   < FaUserAlt size={60} />
   <p>Age : {props.age}  </p>
   <a href={props.email}> Email me </a>
   <Link to={url+props.email}><Button> Connect <FaCheck/></Button></Link>

   </StyledDiv> 
   
   );

}

export default Person;