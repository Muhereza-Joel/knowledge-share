import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Nav } from 'react-bootstrap';

class Login extends Component {
    state = {};

    style = {
      backgroundColor: '#f6f9ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(5px + 2vmin)',
      color: 'white',
    };
  
    render() { 
        return (
           <div style={this.style}>
                     <Form className='card p-3 w-25'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='text-dark'>Username or Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter username or email" required/>
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='text-dark'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Stay Signed In" />
                    </Form.Group>
                    <Button variant="secondary" type="submit"className='btn-sm'>
                        Login
                    </Button>

                    <Nav.Item className='d-flex align-items-center mt-3'>
                        If you dont have an account click
                    <small>
                        <Nav.Link href="/auth/register" className='text-info px-2'>here</Nav.Link>
                    </small>
                    </Nav.Item>
                    </Form>
           </div>
        );
    }
}
 
export default Login;