import React from 'react';
import Request from './Request/request'
const requests = (props) => props.thetasks.map((task, index)=>{
    
    return <Request
    name={task.name} 
    email={task.email}
    description={task.description}
    dueDate = {task.dueDate}
    completed ={task.completed}
    billingMethod = {task.billingMethod}
    hours = {task.hours}
    id = {task._id}
    message = {task.message}
    key={task.name}
    edit = {task.editOwner}
    accepted = {task.accepted}
    paymentMethod= {task.paymentMethod}
    />
});


export default requests;