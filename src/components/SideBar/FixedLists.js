import React, {Fragment} from 'react';
import {ReactComponent as Inbox } from '../../assets/icons/inbox.svg';
import {ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import classes from './FixedLists.module.css';
import { NavLink } from 'react-router-dom';

const FixedLists = () => {
  return (
    <Fragment>
        <NavLink
            to="inbox"
            className={({isActive}) => isActive ? classes.active : undefined }
            end
        >
            <li className={classes.item}>
                <Inbox 
                    className={classes.inbox} 
                    preserveAspectRatio="none"   
                />
                <div className={classes.text}>Inbox</div>
            </li>
        </NavLink>
        <NavLink
            to="upcoming"
            className={({ isActive}) => isActive ? classes.active : undefined}
            end
        >
            <li className={classes.item}>
                <Calendar 
                    className={classes.calendar} 
                    preserveAspectRatio="none"    
                    />
                <div className={classes.text}>Upcoming</div>
            </li>
        </NavLink>
    </Fragment>
  )
}

export default FixedLists