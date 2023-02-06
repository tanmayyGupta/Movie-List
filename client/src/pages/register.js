import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Register () {
    sessionStorage.clear();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    async function registerUser(event) {
        event.preventDefault();

        // const valid = await fetch('https://emailvalidation.abstractapi.com/v1/?api_key=7fdfdcf799f94538b30b91dfcfdd94bd&email=tanmay2015@gmail.com', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email,
        //     }),
        // });

        const url = `https://emailvalidation.abstractapi.com/v1/?api_key=7fdfdcf799f94538b30b91dfcfdd94bd&email=${email}`

        const valid = await fetch(url);
        const validJson = await valid.json();
        console.log(validJson.deliverability);

        var ans = false;
        if(validJson.deliverability === 'DELIVERABLE') {
            ans = true;
        }

        if(ans === true) {
            const response = await fetch('http://localhost:8001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
            })
            
            const data = await response.json()
            console.log(data)

            if(data.status === 'ok') {
                navigate('/login')
            }
        }
        else {
            alert("Entered email is not valid");
            // navigate('/register')
            setName('');
            setEmail('');
            setPassword('');
        }
    }

    return (
        <>
            <form onSubmit={registerUser}>
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
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
                    value="Register"
                />                        
            </form>
        </>
    )
}

export default Register;