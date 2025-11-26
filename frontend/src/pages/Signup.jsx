// import Layout from './../components/Layout';
import React, { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleErrorChecking();
    }

    const handleErrorChecking = () => {
        if(!name || !email || !password) {
            setError('Please make sure to enter name, email and password');
        }
        else {
            setError('');
            // post request here
        }
    }


    return (
        <div>
            <main>
                <form onSubmit={handleSubmit} class="mt-10">
                    <label for="name">Name:</label>
                    <input 
                        className={'box-shadow'}
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={(e) => setName(e.target.value)} 
                    />
                    
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
            </main>
        </div>
    )
}
export default Signup;