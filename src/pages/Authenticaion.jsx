import React from 'react'
import AuthButtonWithProvider from '../components/AuthButtonWithProvider'
import { FaGithub, FaGoogle } from 'react-icons/fa6'

const Authenticaion = () => {
    return (
        <div>
            {/* main section */}
            <div>
                Authenticaion
                <div>
                    <AuthButtonWithProvider Icon={FaGoogle} label={"Sign in with gg"} provider={"GoogleAuthProvider"} />
                    <AuthButtonWithProvider Icon={FaGithub} label={"Sign in with github"} provider={"GitHubAuthProvider"} />
                </div>
            </div>
        </div>
    )
}

export default Authenticaion