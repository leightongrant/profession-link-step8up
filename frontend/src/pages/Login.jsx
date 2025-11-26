import React, { useState } from 'react';
// import Layout from './../components/Layout';

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
                <form onSubmit={handleSubmit} class="mt-10">                  
                    <label for="email">Email:</label>
                    <input 
                        className={'box-shadow'}
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <label for="tel">Password:</label>
                    <input 
                        className={'box-shadow'}
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    
                    <button type="submit" class="bg-blue-400 rounded-xl text-lg p-3">Submit</button>
                    <p class="text-danger mt-5">{error}</p>
                </form>
            </div>
        )
}

export default Login;