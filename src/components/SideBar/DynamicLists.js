import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {ReactComponent as Lines} from '../../assets/icons/lines.svg';
import classes from './DynamicLists.module.css';

const DynamicLists = () => {
    
    const lists = useSelector(state=> state.dynamicLists.lists)
    const listItems = lists.map((listItem) => {
        return(
            <Link 
                to={`${listItem.listId}`}
                //this is for passing data to the destination of the link
                state={listItem.listId}    
                //asigning the key to this element is correct (???)
                key={listItem.listId}
            >
                <li 
                    key={listItem.listId}
                    className={classes.item}
                >
                    <Lines 
                        className={classes.line} 
                        preserveAspectRatio="none"    
                    />
                    <div className={classes.text} >
                        {listItem.name}
                    </div>
                </li>
            </Link>
        )
    })
    
    return ( 
        <Fragment>
            {listItems}
        </Fragment>
    )
}

export default DynamicLists