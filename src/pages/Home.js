import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SignInGoogle from '../components/Authentication/SignInGoogle';
import classes from './Home.module.css';
import Icon from '../assets/icons/Icon';

const HomePage = () => {

    return (
        <Fragment>
            <div className={classes['main-wrapper']}>
                <div className={classes.iconWrapper}>    
                    <Icon 
                        width={256}
                        height={45}
                        lettersFill={'#242527'}
                        />
                </div>
                <div className={classes.textWrapper}>
                    <h1 className={classes['main-title']}>Simple, shareable todo lists.</h1>
                    <h4 className={classes.subtitle}>The easiest way to keep track of the stuff you want to do.</h4>
                    <Link to={'auth?mode=login'}>
                        <button className={classes.button}>
                            Log in 
                        </button>
                    </Link>
                    <Link to={'auth?mode=signup'}>
                        <button className={classes.button}>
                            Sign up 
                        </button>
                    </Link>
                    <SignInGoogle/>
                </div>
            </div>
        </Fragment>
    )
}

export default HomePage
