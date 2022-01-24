import React, {useState} from 'react';
import {LoginForm} from '../components/Auth/LoginForm/LoginForm'
import { RegisterForm } from '../components/Auth/RegisterForm/RegisterForm';
import './Auth.scss';
export default function Auth({setToken}) {
    const [showLogin, setShowLogin] = useState(true);
    return(
        <div className='form'>
            <div>
                {showLogin ? <LoginForm setToken={setToken} /> : <RegisterForm setShowLogin={setShowLogin} />}
            </div>
            <div className='options'>
                <div>
                {showLogin ? (
                    <>
                    <p>¿Todavía no estas registrado/a?</p>
                    <span onClick={() => setShowLogin(false)}> Regístrate</span>
                    </>
                ) : (
                    <>
                    <p>¿Ya estas registrado/a?</p>
                    <span onClick={() => setShowLogin(true)}> Inicia sesión</span>
                    </>
                )}
                </div>
            </div>
        </div>
    );
}


