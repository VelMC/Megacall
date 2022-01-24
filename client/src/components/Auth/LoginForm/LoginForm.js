import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../../../context/UserContext';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './login.scss';

export const LoginForm = ({setToken}) => {
    const context = useContext(AuthContext);
    const {setUser} = context;
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: ""
    });
    const TOKEN = "token";

    useEffect(() => {
        getTokenLocalStorage();
    }, [TOKEN])


    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginUser({...loginUser, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios
                .post('http://localhost:4000/users/login', {
                    username: loginUser.username,
                    password: loginUser.password
                })
                .then((response) => {
                    localStorage.setItem(TOKEN, response.data.token);
                    setToken(response.data.token);
                    setLoginUser({
                        username: "",
                        password: ""
                    });
                    const dataDecode = jwtDecode(response.data.token);
                    const user = {
                        auth: {
                            username: dataDecode.user.username,
                            email: dataDecode.user.email,
                            token: response.data.token,
                            user_id: dataDecode.user.id
                        },
                    };
                    console.log(user);
                    setUser(user);
                })
        } catch (error) {
            
        }
    };

    const getTokenLocalStorage = () => {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            const dataDecode = jwtDecode(token);
            const user = {
                auth: {
                username: dataDecode.user.username,
                email: dataDecode.user.email,
                token: token,
                user_id: dataDecode.user.id,
                },
            };
            setUser(user);
        }
    };

    return (
        <div className='login'>
            <h2>Inicia sesión</h2>
            <form onSubmit={handleSubmit}>
                
                <input
                className='Textfield'
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                value={loginUser.username}
                onChange={handleInput}
                />
        
                <input
                className='Textfield'
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={loginUser.password}
                onChange={handleInput}
                />
        
                <Button  className='Textfield' variant="outlined" type="submit">Login</Button>
            </form>
        </div>
    );
};
