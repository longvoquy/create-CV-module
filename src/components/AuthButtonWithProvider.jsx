import React, { useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { GoogleAuthProvider, GithubAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import useUser from '../hook/useUser';
import { useNavigate } from 'react-router-dom';

const AuthButtonWithProvider = ({ Icon, label, provider }) => {
    const googleAuthProvider = new GoogleAuthProvider();
    const gitHubAuthProvider = new GithubAuthProvider();
    const navigate = useNavigate();
    const { isError, isLoading, data } = useUser();

    useEffect(() => {
        if (!isLoading && data) {
            navigate("/", { replace: true });
        }
    }, [isLoading, data, navigate]);

    const handleClick = async () => {
        try {
            if (provider === "GoogleAuthProvider") {
                await signInWithRedirect(auth, googleAuthProvider);
            } else if (provider === "GitHubAuthProvider") {
                await signInWithRedirect(auth, gitHubAuthProvider);
            } else {
                console.log("Unknown provider");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div onClick={handleClick} className="flex items-center space-x-2 cursor-pointer group">
            <Icon className="text-txtPrimary text-xl group-hover:text-white" />
            <p className="text-txtPrimary text-lg group-hover:text-white">{label}</p>
            <FaChevronRight className="text-txtPrimary text-base group-hover:text-white" />
        </div>
    );
};

export default AuthButtonWithProvider;
