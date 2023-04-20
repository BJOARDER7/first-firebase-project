import React, { useState } from 'react';
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../firebase/firebase.init';

const Login = () => {

    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then(result=> {
            const loginUser = result.user;
            console.log(loginUser)
            setUser(loginUser)
        })
        .catch(error => {
            console.log('Error:', error.message)
        })
    }

    const handleGithunSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loginUser = result.user;
            console.log(loginUser)
            setUser(loginUser)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(result => {
            console.log(result)
            setUser(null)
        })
        .catch(error => {
            console.log('user signout')
        })
    }

    return (
        <div>
            {
                user ? <button onClick={handleSignOut}>Sign Out</button> :
                <div>
                <button onClick={handleGoogleSignIn}>Google Login</button>
                <button onClick={handleGithunSignIn}>Github Login</button>
                </div>
            }
           
            {
                user && <div>
                    <h3>User: {user.displayName}</h3>
                    <p>Email: {user.email}</p>
                    <img src={user.photoURL} alt="Email photo" />
                    </div>
            }
        </div>
    );
};

export default Login;