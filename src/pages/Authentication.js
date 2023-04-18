import React, {useEffect, useState} from 'react';
import { Form, Link, useNavigation, useSearchParams } from 'react-router-dom';
import classes from './Authentication.module.css';
import useOnSubmitForm from '../hooks/useOnSubmitForm';
import InputLabel from '../ui/InputLabel';

const AuthenticationPage = () => {
    
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';
    
    useEffect(()=>{
        setEmail('')
        setName('')
        setPassword('')
    },[isLogin])

    const {onSubmit} = useOnSubmitForm();
    const onSubmitForm = (myEvent) => { onSubmit(name, email, password, myEvent)}
    const onSetEmail=(value)=>{ setEmail(value)}
    const onSetName=(value)=>{ setName(value)}
    const onSetPassword=(value)=>{ setPassword(value)}

    return (
        <div className={classes.formWrapper}>
            <Form onSubmit={onSubmitForm} className={
                isLogin? classes.formLog : classes.formSign
            }>
                <h1 className={classes.h1}>
                    {isLogin ? 'Log in' : 'Create a new user'}
                </h1>
                <InputLabel
                    string={"email"}
                    value={email}
                    onSet={onSetEmail}
                    />
                { !isLogin &&
                    <InputLabel
                    string={"name"}
                    value={name}
                    onSet={onSetName}
                    />
                }
                <InputLabel
                    string={"password"}
                    value={password}
                    onSet={onSetPassword}
                    />
                <div className={classes.actions}>
                    <button className={classes.button}
                            type='submit'
                            disabled = {isSubmitting}> 
                            {isSubmitting ? 'Submitting...' : 
                            isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                    <Link 
                        className={classes.link}
                        to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                        <div className={classes.linkText}>
                            {isLogin ? 'Create New Account' : 'Already have an account? Log In'}
                        </div>
                    </Link>
                    
                </div>
            </Form>
        </div>
    );
}

export default AuthenticationPage