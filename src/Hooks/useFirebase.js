import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import initializeAuthentication from "../config/firebase";


//initialize firebase  authentication
initializeAuthentication()

const useFirebase = () => {
    const [admin, setAdmin] = useState(false);
    const [restaurentadmin, setRestaurentAdmin] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectUrl = location.state?.from || '/';



    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:7000/users/${user.email}`)
            .then(res => res.json())
            .then(data => {

                if (data.admin === "admin") {
                    setAdmin(true);
                    setRestaurentAdmin(false);
                    console.log(admin, user.email)
                    setLoading(false);
                }
                else if (data.admin === "restaurentadmin") {
                    setRestaurentAdmin(true);
                    setAdmin(false);
                    console.log(restaurentadmin, user.email)
                    setLoading(false);

                }

                else {
                    setAdmin(false);
                    setRestaurentAdmin(false);
                    setLoading(false);
                }
            })

    }, [user.email])


    //on State Change 
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }

            setLoading(false);
        })
    }, [auth])

    const saveUser = (email, displayName, photoURL, method) => {
        const user = { UserEmail: email, UserName: displayName, photoURL };

        fetch('http://localhost:7000/adduser', {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    //sign up functionality
    const signUpUser = (email, password, name, image) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                setLoading(true);
                setUser(res.user);
                saveUser(email, name, image, "POST");
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: image
                }).then(() => {

                    swal("Sign Up!", "Sign Up Successfull", "success");

                    navigate(redirectUrl);
                })

            }).finally(() => setLoading(false)).catch(err => setError(err.message));
    }

    //sign in functionality
    const signInUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setLoading(true);
                setUser(res.user);
                swal("Sign in!", "Sign in Successfull", "success");
                navigate(redirectUrl);
            }).finally(() => setLoading(false))
            .catch(err => setError(err.message))
    }


    //google sign in 
    const signInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(res => {
                setLoading(true);
                setUser(res.user);
                saveUser(res.user.email, res.user.displayName, res.user.photoURL, "PUT");
                swal("Sign in!", "Sign in Successfull", "success");
                navigate(redirectUrl);
            }).finally(() => setLoading(false)).catch(err => setError(err.message))
    }

    // sign out 
    const signOutUser = () => {
        signOut(auth).then(() => {
            setUser({});
            swal("Sign Out!", "Sign out Successfull", "error");
            navigate('/login')
        }).finally(() => setLoading(false)).catch((err) => {
            setError(err.message);
        });
    }

    return {
        user,
        admin,
        restaurentadmin,
        error,
        loading,
        signUpUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
    }
}

export default useFirebase
