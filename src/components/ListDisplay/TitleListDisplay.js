import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { dynamicListsActions } from '../../store/dynamicLists-slice';
import { ReactComponent as Garbage } from '../../assets/icons/garbage.svg';
import classes from './TitleListDisplay.module.css';
import { ClickAlerter } from '../ClickAlerter';

const TitleListDisplay = (props) => {

    const{listId} = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteListHandler = () => 
    {
        console.log("inside deleteListHandler")
        dispatch(dynamicListsActions.deleteDynamicList(listId))
        navigate("/lists/inbox")
    }

    return (
        <div className={classes.listWrapper}>
            <ClickAlerter>
                <div
                    className={classes['showlist-div']}
                    onClick={deleteListHandler}
                    >
                    <Garbage className={classes.garbage}/>
                    <span className={classes.spanText}>
                        Delete List  
                    </span>
                </div>
            </ClickAlerter>
        </div>
    )
}

export default TitleListDisplay