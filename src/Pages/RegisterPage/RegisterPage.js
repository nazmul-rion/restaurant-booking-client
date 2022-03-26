import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const RegisterPage = () => {
    const { signInWithGoogle, signUpUser, error } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [validated, setValidated] = useState(false);

    const handleNameChange = e => {
        setName(e.target.value);
        setValidated(true);
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
        setValidated(true);
    }

    const handlePassChange = e => {
        setPass(e.target.value);
        setValidated(true);
    }

    const signinWithEmailPasswordHandler = e => {
        e.preventDefault();
        if (email !== '' && pass !== '' && name !== '') {
            signUpUser(email, pass, name);
        }
    }
    return (
        <div className="container bg-light border-shadow my-5">

            <div className="">
                <div className="text-center">
                    <h1 className=" text-bold mb-4">Please Register for an Account</h1>
                </div>
                <form  >
                    <div className="mb-3" >
                        <label className="fw-bold">Name:</label>
                        <input
                            onBlur={handleNameChange}
                            type="text"
                            placeholder="Enter your Name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold">Email address:</label>
                        <input
                            onBlur={handleEmailChange}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="mb-3" >
                        <label className="fw-bold">Password:</label>
                        <input
                            onBlur={handlePassChange}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {
                        error !== '' ? (<p className="text-danger"> {error}</p>) : (<></>)
                    }
                    <button
                        onClick={signinWithEmailPasswordHandler}
                        className="btn btn-info my-3"
                        type="submit"
                    >
                        Register
                    </button>
                </form>

                <button onClick={signInWithGoogle} className="btn btn-info rounded rounded-pill ">
                    Sign up from Google
                </button>
                <p className="text-center pt-3 m-0">
                    already have an account? <Link to="/login">Go To Login</Link>
                </p>
            </div>
        </div>

    );
};
export default RegisterPage