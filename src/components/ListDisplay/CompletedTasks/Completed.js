import React, { useState } from 'react'
import classes from './Completed.module.css';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrow-down.svg';
import CompletedTasks from './CompletedTasks';

const Completed = (props) => { 

    const list = props.list;
    const amount = list.amountCompleted;

    const [wrapperIsOpen, setWrapperIsOpen] = useState(false);
    const arrowClass = wrapperIsOpen ?  `${classes.arrow} ${classes.up}` : classes.arrow;
    
    const arrowClassHandler = () => 
    {
        setWrapperIsOpen (prevState => !prevState);
    }

    return (
    <div 
        className={classes.mainWrapper}
    >
        <div className={classes.completed}
            onClick={arrowClassHandler} 
        >
            <div className={classes.text}>
                Completed ({amount})
            </div>
            <div className={classes.arrowWrapper}>
                <ArrowDown 
                    className={arrowClass}
                    preserveAspectRatio = "none"
                />
            </div>
        </div>
        { wrapperIsOpen && 
            <CompletedTasks
                list={list}
            /> 
        }
    </div>
  )
}


export default Completed;