import { useDispatch } from 'react-redux';
import { dynamicListsActions } from '../store/dynamicLists-slice';
import { inboxActions } from '../store/inbox-slice';
import uniqid from 'uniqid';

export function usePendingTaskOperations ()
{
    const dispatch = useDispatch();
    
    const deleteTaskHandler = (task, onSetLastIndex, index) =>
    {
      const dynamic = task.listId !== "inbox" && task.listId !== "upcoming";
      const objectToDispatch = 
      {
        itemId: task.itemId,
        listId: task.listId,
      }
      dynamic 
        ? dispatch(dynamicListsActions.deleteTaskFromList(objectToDispatch))
        : dispatch(inboxActions.deleteTask(objectToDispatch));
      
        onSetLastIndex(index);
    }
  
    const completeTaskHandler = (task) =>
    {
      const dynamic = task.listId !== "inbox" && task.listId !== "upcoming";
      const objectToDispatch = 
      {
        itemId: task.itemId,
        listId: task.listId,
      }
      dynamic 
        ? dispatch(dynamicListsActions.completeTask(objectToDispatch))
        : dispatch(inboxActions.completeTask(objectToDispatch))
    }

    const createTaskHandler = (listId, enteredInput, onSetEnteredInput) =>
    {
        const objectToDispatch = 
        {
            listId: listId,
            itemId:uniqid(),
            name: enteredInput,
            date: "undefined",
        };
        
        (listId !== "inbox" && listId !=="upcoming") 
            ? dispatch(dynamicListsActions.addTaskToList(objectToDispatch))
            : dispatch(inboxActions.addTask(objectToDispatch));

        onSetEnteredInput("");
    } 

    return {deleteTaskHandler, completeTaskHandler, createTaskHandler}
}