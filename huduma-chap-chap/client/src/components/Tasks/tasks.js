import React from 'react';
import Task from './Task/task'
const tasks = (props) => props.thetasks.map((task, index)=>{
    
    return <Task 
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
    />
});


export default tasks;