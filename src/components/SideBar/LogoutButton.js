import React from 'react'
import { ReactComponent as Logout } from '../../assets/icons/log-out.svg';
import { auth } from '../../firebase'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { inboxActions } from '../../store/inbox-slice';
import { dynamicListsActions } from '../../store/dynamicLists-slice';
import classes from './LogoutButton.module.css';

const LogoutButton = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () =>
  {
    console.log("inside logoutHandler")
    try 
    {
      await signOut(auth)
      .then(()=>{
        dispatch(authActions.resetState())
        dispatch(inboxActions.resetState())
        dispatch(dynamicListsActions.resetState())
        localStorage.removeItem('user');
      })
      .then(navigate('/'))
    } 
    catch (err) 
    {
      console.log("error loging out")
      console.error(err);
    }
  }

  return (
    <button 
        className={classes.button}
        onClick={logoutHandler}
        >
        <div className={classes['logout-wrapper']}>
            <div className={classes['logout-div']}>
                <Logout className={classes.logout}/>
                <span className={classes.spanLogOut}>Sign out</span>
            </div>
        </div>
    </button>
  )
}

export default LogoutButton