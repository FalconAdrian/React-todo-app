import React, { Fragment } from "react";
import UserInfo from "./UserInfo";
import SideBarLists from "./SideBarLists";
import classes from "./SideBar.module.css";

const SideBar = (props) =>{

    const {isLoading} = props;
    return(
        <div className={classes.sideBar}>
            { isLoading && <UserInfo isLoading={isLoading}/> }
            { !isLoading &&
                <Fragment>
                    <UserInfo/>
                    <SideBarLists/>
                </Fragment>
            }
        </div>
    )
}

export default SideBar;