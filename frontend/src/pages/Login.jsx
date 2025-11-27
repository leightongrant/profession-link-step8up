import React, { useState } from 'react';
// import Layout from './../components/Layout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleErrorChecking();
    }

    const handleErrorChecking = () => {
        if(!email || !password) {
            setError('Please make sure to enter email and password');
        }
        else {
            setError('');
            // post request here
        }
    }


        return (
            <div>
                <main>
                    <Form className="mx-5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <p className="text-danger mt-5 ml-2">{error}</p>
                    </Form>
                </main>
            </div>
        )
}

export default Login;