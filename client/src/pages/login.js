import React, { useState } from "react";

function Login () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:8001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        })
        
        const data = await response.json()
        console.log(data)

        if(data.user) {
            // localStorage.setItem('token', data.user);
            sessionStorage.setItem('token', data.user);
            alert('Login Successful');
            window.location.href = '/home';
        }
        else {
            alert('Please check your username and password');
        }
    }

    return (
        <>
            <form onSubmit={loginUser}>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}                    
                />    
                <br />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}                    
                />    
                <br />
                <input
                    type="submit"
                    value="login"
                />                        
            </form>
        </>
    )
}

export default Login;