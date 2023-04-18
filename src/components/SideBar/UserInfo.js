import React, { useState } from 'react'
import classes from './UserInfo.module.css'
import { auth } from '../../firebase'
import { ReactComponent as DownArrow } from '../../assets/icons/down-arrow.svg';
import { ClickAlerter } from '../ClickAlerter';
import { useRef } from 'react';
import LogoutButton from './LogoutButton';

const UserInfo = () => {

  const [logoutShown, setLogoutShown] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))
  const userName = auth?.currentUser?.displayName;
  const userEmail = auth?.currentUser?.email;
  const userPhoto = auth?.currentUser?.photoURL;
  const toggleButtonRef = useRef()

  const logoutDivToggler =  () => { setLogoutShown(prevState => (!prevState))} 
  const logoutDivCloser = () => { setLogoutShown(false);}

  return (
    <div className={classes.main}>
      { user ? user.photo 
                  ?  <img src={user.photo} className={classes.photo} alt=''/>
                  : <div className={classes.circle}>
                      { user.name ? user.name[0] : " " }
                    </div>
             : userPhoto 
                  ? <img src={userPhoto} className={classes.photo} alt=''/>
                  : <div className={classes.circle}>
                      { userName ? userName[0] : " " }
                    </div>       
      }
        
      <div className={classes.text}>
        <p className={classes.name}>{user ? user.name : userName}</p>
        <button 
          className={classes.button}
          onClick={logoutDivToggler}
          ref={toggleButtonRef}
        >
          <DownArrow className={classes['down-arrow']}/>
        </button>
        {logoutShown && 
          <ClickAlerter
            funct={logoutDivCloser}
            except={toggleButtonRef}
            boolean={logoutShown}
          >
            <LogoutButton/>
          </ClickAlerter>
        }
        <p className={classes.email}>{user ? user.email : userEmail}</p>
      </div>
    </div>
  )
}

export default UserInfo