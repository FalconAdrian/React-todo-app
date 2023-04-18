import React, { Fragment } from "react";
import classes from './SideBarLists.module.css'
import {ReactComponent as Plus} from "../../assets/icons/plus-circle.svg";
import DynamicLists from "./DynamicLists";
import FixedLists from "./FixedLists";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const SideBarLists = (props) =>{

    const dispatch = useDispatch()
    const showModalHandler = () => 
    {
        dispatch(uiActions.showModal())
    }

    return(
        <Fragment>
            <ul className={classes.list}>
                <FixedLists/>
                <DynamicLists/>
            </ul>
            <div 
                className={classes.add}
                onClick={showModalHandler}
            >
                <Plus 
                    className={classes.circle} 
                    preserveAspectRatio="none"    
                />
                <span className={classes.text}>Create List</span>
            </div>
        </Fragment>
    )
}

export default SideBarLists;