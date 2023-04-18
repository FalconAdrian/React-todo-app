import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import classes from "./Modal.module.css";

const BackDrop = () => {

  const dispatch = useDispatch();
  const closeModalHandler = () =>
  {
    dispatch(uiActions.hideModal())
  }

  return (
    <div
      className={classes.backdrop}
      onClick={closeModalHandler}
    >    
    </div>
  )
}

const ModalOverlay = (props) => {
  return(
    <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlay-root');

const Modal = (props) => {
  return (
    <Fragment>
        {ReactDOM.createPortal(<BackDrop/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  )
}

export default Modal;



