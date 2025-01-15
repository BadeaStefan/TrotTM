import { useState, useEffect } from 'react';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
   async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            try {
                const result = await fetch('http://localhost:3000/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });
            } catch (error) {
                console.log(error);
            }

        } else {
            alert('Passwords not match');
        }
    }

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                    <div className="bs">
                        <h2>Register</h2>
                        <input type="text" className="form-control" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                        <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input type="text" className="form-control" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} ></input>
                        <input type="text" className="form-control" placeholder="confirm password" value={cpassword} onChange={(e) => { setCpassword(e.target.value) }}></input>
                        <button className="btn btn-primary mt-3" onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}