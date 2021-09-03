import React from 'react';
import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const welcomeMessage = (props) =>{
return(
    <div>
<h1>Welcome to eService</h1>
<h2>The best place to find or provide a service</h2>
<Link to="/login"><Button>Login</Button></Link> {' '}{' '}

<Link to="/create"><Button>Register</Button></Link>
</div>
);

}

export default welcomeMessage;