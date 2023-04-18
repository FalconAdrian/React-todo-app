import React from 'react'
import useSignInWithGoogle from '../../hooks/useSignInWithGoogle'
import classes from './SignInGoogle.module.css'

const SignInGoogle = () => {

    const {signInWithGoogle} = useSignInWithGoogle();

    return (
        <button 
            className={classes.button}
            onClick={signInWithGoogle}
        >
            Google Sign in
        </button>
    )
}

export default SignInGoogle