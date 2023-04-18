import { useDispatch } from 'react-redux';
import { dynamicListsActions } from '../store/dynamicLists-slice';
import { uiActions } from '../store/ui-slice';
import uniqid from 'uniqid';

export default function useSideBarOperations()
{
    const dispatch = useDispatch();

    const closeModalHandler = () => { dispatch( uiActions.hideModal())}

    const addListHandler = (myEvent, enteredInput) =>
    {
      myEvent.preventDefault();
      dispatch(dynamicListsActions.addList(
        {
          id:uniqid(),
          name: enteredInput,
          pending:[],
          completed:[],
        }
      ))
      dispatch( uiActions.hideModal())
    }

    return { closeModalHandler, addListHandler}
}