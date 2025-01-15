import { useState, useEffect } from 'react';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        const user = {
            email,
            password,
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            const userData = await response.json();
            localStorage.setItem('currentUser', JSON.stringify(userData));

            window.location.href = '/home';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                    <div className="bs">
                        <h2>Login</h2>
                        <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input type="text" className="form-control" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} ></input>
                        <button className="btn btn-primary mt-3" onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}