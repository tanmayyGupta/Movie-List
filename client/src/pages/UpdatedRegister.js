/*
  This Login requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { LockClosedIcon } from '@heroicons/react/20/solid';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import BottomFooter from './BottomFooter';

export default function Register() {
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
      {/*
        This Login requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className=' items-stretch'>
        <div className="flex min-h-full items-center justify-center py-20 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
            <div>
                <img
                className="mx-auto h-12 w-auto"
                src="https://cdn-icons-png.flaticon.com/512/777/777242.png"
                alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create a new account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign In
                </a>
                </p>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label htmlFor="username" className="sr-only">
                    Username
                    </label>
                    <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="email-address" className="sr-only">
                    Email address
                    </label>
                    <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                    Password
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}   
                    />
                </div>
                </div>

                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                    </a>
                </div>
                </div>

                <div>
                <button
                    onClick={registerUser}
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign Up
                </button>
                </div>
            </form>
            </div>
        </div>
      </div>  
    </>
  )
}
