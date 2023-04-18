import React, { Fragment, useState } from "react";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Box} from '../../assets/icons/square.svg';
import classes from './AddTask.module.css';
import { usePendingTaskOperations } from "../../hooks/usePendingTaskOperations";

const AddTask = (props) => {

    const {listId} = props;

    const[buttonVisible, setButtonVisible] = useState(true);
    const[enteredInput, setEnteredInput] = useState("");
    const {createTaskHandler} = usePendingTaskOperations();

    const onSetEnteredInput = (value) => { setEnteredInput("value")}
    const toggleComponentHandler = () => {setButtonVisible((prevState) => !prevState);}
    const inputChangeHandler = (myEvent) => {setEnteredInput(myEvent.target.value);}
    const addTaskHandler = (myEvent) => 
    { 
        if(myEvent.key === 'Enter')
        {
            createTaskHandler(listId, enteredInput, onSetEnteredInput);
        } 
    }

    return(
        <Fragment>
            { buttonVisible &&
                <button 
                    className={classes.button}
                    onClick={toggleComponentHandler}
                >
                    <div className={classes.plusWrapper}>
                        <Plus className={classes.plus}/> 
                    </div>
                    Add Task
                </button>
            }
            {
                !buttonVisible &&
                <div className={classes.inputWrapper}>
                    <Box className={classes.box}/>
                    <input 
                        className={classes.input}
                        autoFocus
                        value={enteredInput}
                        onBlur={toggleComponentHandler}
                        onKeyDown={addTaskHandler}
                        onChange={inputChangeHandler}
                    ></input>
                </div>
            }
        </Fragment>
    )
}

export default AddTask