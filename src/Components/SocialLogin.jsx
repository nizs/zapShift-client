import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SocialLogin = () => {
    const { socialSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignin = () => {
        const googleProvider = new GoogleAuthProvider();
        socialSignIn(googleProvider)
            .then((result) => {
                console.log(result.user)
                toast.success('Successfully LoggedIn!')
                // redirecting user where they tried to went 
                setTimeout(() => {
                    navigate(location?.state || '/');
                }, 1000);
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignin} className="btn w-full flex items-center gap-2">
                <FaGoogle /> Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;