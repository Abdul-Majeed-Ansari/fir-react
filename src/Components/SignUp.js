import React, { useState } from 'react';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { app } from '../config/Firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const submitHandler = (event) =>{
        event.preventDefault();
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then(res=>{
            navigate('/login')
        })
        .catch(err=>{
            console.log(err);
            
        })
    }

  return (
    <div>
        <h2>SignUp</h2>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Enter Your Email' />
            <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Enter Your Password' />
            <button type='submit'>SignUp</button>
        </form>
    </div>
  )
}

export default SignUp