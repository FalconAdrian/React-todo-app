import { useDispatch } from 'react-redux';
import { dynamicListsActions } from '../store/dynamicLists-slice';
import { inboxActions } from '../store/inbox-slice';

export default function useEventfulCompletedTasksOperations() 
{
  const dispatch = useDispatch();
  const changeTaskNameHandler = (myEvent, props, enteredInput) =>
  {
    //props
    const {
      completedTask, 
      index, 
      setLastIndex_Handler
    } = props;

    //constants from props
    const dynamic = completedTask.listId !== 'inbox' && completedTask.listId !== 'upcoming';

    if(myEvent === 'onBlur')
    {
      const objectToDispatch = 
      {
          itemId: completedTask.itemId,
          listId: completedTask.listId,
          name: enteredInput,
      }
      dynamic ? dispatch(dynamicListsActions.changeCompletedTaskName(objectToDispatch))
              : dispatch(inboxActions.changeCompletedTaskName(objectToDispatch));
    }
    if(myEvent.key === 'Backspace' && enteredInput === "")
    {
      //utilizamos el prevent default para que el Backspace no continue
      //y borre el comienzo del Item anterior.
      myEvent.preventDefault();
      setLastIndex_Handler(index);
      const objectToDispatch = 
      {
          itemId: completedTask.itemId,
          listId: completedTask.listId,
      }
      dynamic ? dispatch(dynamicListsActions.deleteCompletedTask(objectToDispatch))
              : dispatch(inboxActions.deleteCompletedTask(objectToDispatch));
    }
  }

  const inputChangeHandler = (myEvent, onSetEnteredInput) => 
  {
    onSetEnteredInput(myEvent.target.value);
  }

  return {changeTaskNameHandler, inputChangeHandler}
}