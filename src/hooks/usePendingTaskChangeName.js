import { useDispatch } from "react-redux";
import { dynamicListsActions } from '../store/dynamicLists-slice';
import { inboxActions } from '../store/inbox-slice';
import uniqid from 'uniqid';

export function usePendingTaskChangeName()
{
    const dispatch = useDispatch();

    const changeTaskNameHandler = ( task, index, enteredInput, onSetEditTextActive, onSetGarbageIconVisible, onSetCalendarComponentVisible, onSetLastIndex, myEvent ) =>
    {
        const dynamic = task.listId !== "inbox" && task.listId !== "upcoming";

        if(myEvent === 'onBlur')
        {
            const objectToDispatch = 
            {
                itemId: task.itemId,
                listId: task.listId,
                name: enteredInput,
            }
            dynamic
                ? dispatch(dynamicListsActions.changeTaskName(objectToDispatch))
                : dispatch(inboxActions.changeTaskName(objectToDispatch));
            
            onSetEditTextActive(false);
            onSetGarbageIconVisible(false);
            onSetCalendarComponentVisible(false);
        }
        if(myEvent.key === 'Enter' )
        {
            if(enteredInput === task.name)
            {
                const objectToDispatchAdd = 
                {
                    prev_itemId: task.itemId,
                    itemId:uniqid(),
                    listId: task.listId,
                    name: "",
                    date: "undefined",
                }
                dynamic
                ? dispatch(dynamicListsActions.addTaskToIndex(objectToDispatchAdd))
                : dispatch(inboxActions.addTaskToIndex(objectToDispatchAdd));
            }
            else
            {
                const objectToDispatch = 
                {
                itemId: task.itemId,
                listId: task.listId,
                name: enteredInput,
                }
                dynamic
                ? dispatch(dynamicListsActions.changeTaskName(objectToDispatch))
                : dispatch(inboxActions.changeTaskName(objectToDispatch));

                const objectToDispatchAdd = 
                {
                prev_itemId: task.itemId,
                itemId:uniqid(),
                listId: task.listId,
                name: "",
                date: "undefined",
                }
                dynamic
                ? dispatch(dynamicListsActions.addTaskToIndex(objectToDispatchAdd))
                : dispatch(inboxActions.addTaskToIndex(objectToDispatchAdd));
            }
            onSetEditTextActive(false);
            onSetGarbageIconVisible(false);
            onSetCalendarComponentVisible(false);
        }
        if(myEvent.key === 'Backspace' && enteredInput === "")
        {
            //utilizamos el prevent default para que el Backspace no continue
            //y borre el comienzo del Item anterior.
            myEvent.preventDefault();
            onSetLastIndex(index);
            const objectToDispatch = 
            {
                itemId: task.itemId,
                listId: task.listId,
            }
            dynamic
            ? dispatch(dynamicListsActions.deleteTaskFromList(objectToDispatch))
            : dispatch(inboxActions.deleteTask(objectToDispatch));

            onSetEditTextActive(true);
            onSetGarbageIconVisible(false);
            onSetCalendarComponentVisible(false);
        }
    }

    return {changeTaskNameHandler}
}