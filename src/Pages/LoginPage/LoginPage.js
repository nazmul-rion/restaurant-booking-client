import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const LoginPage = () => {
    const { signInWithGoogle, signInUser, error } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [validated, setValidated] = useState(false);
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
        if (email !== '' && pass !== '') {
            signInUser(email, pass);
        }
    }

    return (
        <div className="container bg-light border-shadow my-5">
            <div className="">
                <div className="text-center">
                    <h1 className=" text-bold mb-4">Login in to Your Account</h1>
                </div>

                <form  >

                    <div className='my-3'>
                        <label className="fw-bold">Email:</label>
                        <input
                            onBlur={handleEmailChange}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>


                    <div className='my-3'>
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
                    <button onClick={signinWithEmailPasswordHandler} className="btn btn-info" type="submit">
                        Login
                    </button>
                    <p>or use Google for login</p>
                    <button onClick={signInWithGoogle} className="btn btn-info rounded rounded-pill">
                        Login with Google
                    </button>



                    <p className="text-center pt-3 m-0">
                        dont have an account? <Link to="/register">Register Now</Link>
                    </p>
                </form>
            </div>

        </div >
    );
};

export default LoginPage