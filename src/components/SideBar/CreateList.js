import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import useSideBarOperations from '../../hooks/useSideBarOperations';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import classes from './CreateList.module.css';

const CreateList = () => {

  const [enteredInput, setEnteredInput] = useState("");
  const changeHandler = myEvent => { setEnteredInput(myEvent.target.value)}

  const {closeModalHandler, addListHandler} = useSideBarOperations();
  const eventCatcher = (myEvent) => { addListHandler(myEvent, enteredInput) } 

  return (
    <Modal>
        <div className={classes.crossWrapper}>
            <Cross className={classes.cross}
                   onClick={closeModalHandler}
            />
        </div>
        <form className={classes.form}
              onSubmit={eventCatcher}
        >
            <label >Create a list</label>
            <input type='text'
                   placeholder='Name'
                   onChange={changeHandler}
            />
            <div className={classes.buttons}>
            <button className={classes['cancel-button']}
                    onClick={closeModalHandler}
                    type="button"
            >
                Cancel
            </button>
            <button className={classes['create-button']}
                    type="submit"
            >
                Create List
            </button>
            </div>
        </form>
    </Modal>
  )
}

export default CreateList