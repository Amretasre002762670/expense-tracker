import { useState } from 'react';
import '../login/Login.css';

const Login = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailValidation = (event) => {
        const email = event.target.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const handlePasswordValidation = (event) => {
        const password = event.target.value;

        if (!password.trim()) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    return (
        <div className="container-fluid main-container">
            <div className='container'>
                <div className="form-top-container">
                    <h1>Login/Signup</h1>
                    <div className="form-container">
                        <form>
                            <div className="inside-container">
                                <div className="row g-3 align-items-center email-row">
                                    <div className="col-3">
                                        <label for="email" className="col-form-label">Email</label>
                                    </div>
                                    <div className="col">
                                        <input type="text" id="email" className="form-control" onBlur={handleEmailValidation} />
                                    </div>
                                </div>
                                <div className="danger-row">
                                    {emailError ? <div className="text-danger email-error"> Invalid email format </div> : <div className="place-holder"></div>}
                                </div>
                                <div className="row g-3 align-items-center password-row">
                                    <div className="col-3">
                                        <label for="password" className="col-form-label">Password</label>
                                    </div>
                                    <div className="col">
                                        <input type="password" id="password" className="form-control" aria-describedby="passwordHelpInline" onBlur={handlePasswordValidation} />
                                    </div>
                                </div>
                                <div className="danger-row">
                                    {passwordError ? <div className="text-danger password-error">Password cannot be empty</div> : <div className="place-holder"></div>}
                                </div>
                                <div className="row g-3 button-row align-items-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Login;