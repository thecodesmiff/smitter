import { useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from '../components/Login.module.css';

export default function Auth () {

        const [cookies, setCookie, removeCookie] = useCookies(null);
        const [isLogin, setIsLogin] = useState(false);
        const [email, setEmail] = useState(null);
        const [password, setPassword] = useState(null);
        const [confirmPassword, setConfirmPassword] = useState(null);
        const [error, setError] = useState(null);
        
        const viewLogin = (status) => {
            setError(null);
            setIsLogin(status);
        }

        const handleSubmit = async (e, endpoint) => {
            e.preventDefault();
            if(!isLogin && password !== confirmPassword) {
                setError('Make sure passwords match');
                return;
            }
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json();

            if(data.detail) {
                setError(data.detail);
            } else {
                setCookie('Email', data.email);
                setCookie('AuthToken', data.token);
                setCookie('UserName', data.username)

                window.location.reload();
            }
        }


    return (
        <div className={styles.auth_container}>
        <div className={styles.auth_container_box}>
            <form action="">
                <h2>{isLogin ? 'Please Log In' : 'Please Sign Up!'}</h2>
                <input 
                    type="email" 
                    placeholder="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin && <input 
                                type="password" 
                                placeholder="confirm password" 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />}
                <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
                {error && <p>{error}</p>}
            </form>
            <div className={styles.auth_options}>
                <button 
                    onClick={() => viewLogin(false)}
                    style={{backgroundColor: isLogin ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}
                >
                    Sign Up
                </button>
                <button 
                    onClick={() => viewLogin(true)}
                >
                    Login
                </button>
            </div>
        </div>
    </div>
    )
}