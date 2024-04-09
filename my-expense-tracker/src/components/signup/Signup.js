import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../signup/Signup.css';
import axios from 'axios';

const Signup = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const navigate = useNavigate();
    // const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const handleNameValidation = (event) => {
        const inputName = event.target.value;
        // setName(inputName);

        if (!inputName.trim()) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    };

    const handleEmailValidation = (event) => {
        const email = event.target.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailErrorText("Email cannot be empty");
            setEmailError(true);
        } else if (!emailPattern.test(email)) {
            setEmailErrorText("Invalid Email");
            setEmailError(true);
        }
        else {
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

    const BASE_URL = 'http://127.0.0.1:8080'; // Change this to your AWS RDS URL

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        };

        try {
            const response = await axios.post(`${BASE_URL}/signup/`, JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                console.log('Signup successful');
                navigate('/landingPage');
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };


    return (
        <div className="container-fluid main-container">
            <div className='container'>
                <div className="form-top-container">
                    <h1>Signup</h1>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="inside-container">
                                <div className="row g-3 align-items-center name-row">
                                    <div className="col-4">
                                        <label for="name" className="col-form-label">Name: </label>
                                    </div>
                                    <div className="col">
                                        <input type="text" id="name" className="form-control input-text-box" onBlur={handleNameValidation} />
                                    </div>
                                </div>
                                <div className="error-row">
                                    {nameError ? <div className="text-danger error-message">Name cannot be empty</div> : <div className="place-holder"></div>}
                                </div>
                                <div className="row g-3 align-items-center email-row">
                                    <div className="col-4">
                                        <label for="email" className="col-form-label">Email:</label>
                                    </div>
                                    <div className="col">
                                        <input type="text" id="email" className="form-control input-text-box" onBlur={handleEmailValidation} />
                                    </div>
                                </div>
                                <div className="error-row">
                                    {emailError ? <div className="text-danger error-message"> {emailErrorText} </div> : <div className="place-holder"></div>}
                                </div>
                                <div className="row g-3 align-items-center password-row">
                                    <div className="col-4">
                                        <label for="password" className="col-form-label">Password:</label>
                                    </div>
                                    <div className="col">
                                        <input type="password" id="password" className="form-control input-text-box" aria-describedby="passwordHelpInline" onBlur={handlePasswordValidation} />
                                    </div>
                                </div>
                                <div className="error-row">
                                    {passwordError ? <div className="text-danger error-message">Password cannot be empty</div> : <div className="place-holder"></div>}
                                </div>
                                <div className="row g-3 link-row align-items-center">
                                    <a href="/login" className="signup-link">Login Instead</a>
                                </div>
                                <div className="row g-3 button-row align-items-center">
                                    <button type="submit" className="btn login-button">Signup</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;