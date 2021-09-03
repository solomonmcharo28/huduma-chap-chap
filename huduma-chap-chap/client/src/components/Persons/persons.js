import React from 'react';
import Person from './Person/person'
const persons = (props) => props.persons.map((person, index)=>{
    return <Person 
    name={person.name} 
    age ={person.age}
    email = {person.email}
    userType = {person.userType}
    occupation = {person.occupation}
    id = {person._id}
    />
});


export default persons;