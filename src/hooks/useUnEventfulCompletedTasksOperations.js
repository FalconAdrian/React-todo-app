import { useDispatch } from 'react-redux';
import { dynamicListsActions } from '../store/dynamicLists-slice';
import { inboxActions } from '../store/inbox-slice';

export default function useUneventfulCompletedTasksOperations () 
{
    const dispatch = useDispatch();

    const deleteCompletedTaskHandler = (dynamic, objectToDispatch) =>
    {
        dynamic ? dispatch(dynamicListsActions.deleteCompletedTask(objectToDispatch))
                : dispatch(inboxActions.deleteCompletedTask(objectToDispatch))
    }

    const reAddCompletedTaskHandler = (dynamic, objectToDispatch) => 
    {
        dynamic ? dispatch(dynamicListsActions.reAddTaskFromCompleted(objectToDispatch))
                : dispatch(inboxActions.reAddTaskFromCompleted(objectToDispatch))
    }

  return {deleteCompletedTaskHandler, reAddCompletedTaskHandler}

}