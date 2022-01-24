import axios from 'axios';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../LoginForm/login.scss'

export const RegisterForm = ({setShowLogin}) => {
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewUser({...newUser, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios
                .post("http://localhost:4000/users/signin", {
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password
                })
                .then((response) => {
                    setShowLogin(true);
                })
        } catch (error) {
            
        }
    }
    
    return (
        <div className='login'>
            <h2>Regístrate</h2>
            <form onSubmit={handleSubmit}>
                <input
                className='Textfield'
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                value={newUser.username}
                onChange={handleInput}
                />
        
                
                <input
                className='Textfield'
                type="text"
                id="email"
                placeholder="Email"
                name="email"
                value={newUser.email}
                onChange={handleInput}
                />
        
                
                <input
                className='Textfield'
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={handleInput}
                />
                <Button className='Textfield' variant="outlined" type="submit">Registrar</Button>
            </form>
        </div>
    );
};
