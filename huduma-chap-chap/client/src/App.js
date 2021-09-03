import React, {Component} from 'react';
import axios from 'axios';
import Footer from './components/Footer'
import './App.css';
import SearchField from "react-search-field";
import CreateForm from './components/Forms/createUser'
import TaskForm from './components/Forms/createTask'
import AddInfo from './components/Forms/addInfo'
import UserHomepage from './components/userHomepage'
import Person from './components/Persons/Person/person'
import Persons from './components/Persons/persons'
import LoginForm from './components/Forms/loginUser'
import NavBar from './components/NavBar'
import WelcomeMessage from './components/welcome'
import {Button} from 'react-bootstrap'
import {BrowserRouter, Route} from 'react-router-dom';


class App extends Component {
  state = {
    persons: [],
    otherState: "SomeOtherValue",
    showPersons: false
  }
  
  componentDidMount(){
    axios.get('http://localhost:3000/users/all').then(response =>{
       this.setState({persons:response.data})
       console.log(this.state.persons);
    });
  
  }
 
  togglePersonHandler = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
   }

  render(){
    const style = {
      "display" : "flex",
      "flexWrap" : "wrap",
    }
    let persons = null
    if(this.state.showPersons){
    persons =( <div style={style}> 
       
        
        <Persons 
        persons = {this.state.persons}
         />

    </div>
    )
      }
  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
      <header className="App-header">
       
      <Route path="/" exact render={(props) =>
        <div>
          
          <WelcomeMessage/>
          <Button onClick={this.togglePersonHandler}> See Service Providers and Consumers ({this.state.persons.length} users)</Button>
          {' '}{' '}<SearchField
  placeholder="Search..."
  
  
/>
          <br></br>
          {persons}
        </div>
      } />
      <Route path="/create" exact component={CreateForm} />
      <Route path="/connect" exact component={TaskForm} />
      <Route path="/login" exact component={LoginForm} />
      <Route path="/homepage" exact component={UserHomepage} />
      <Route path="/info" exact component={AddInfo} />
      </header>
    </div>

    < Footer />
    </BrowserRouter>
  );
}
}

export default App;
