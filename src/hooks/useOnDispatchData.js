import { fetchFirestoreInboxData } from '../store/inbox-actions';
import { fetchFirestoreDynamicListsData  } from '../store/dynamicLists-actions';
import { authGetUser } from '../store/auth-actions';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

export default function useOnDispatchData ()
{
    const dispatch = useDispatch();

    const dispatchCurrentUser = useCallback( async () => 
    {
        dispatch(authGetUser(auth.currentUser.uid));
        dispatch(fetchFirestoreDynamicListsData(auth.currentUser.uid));
        dispatch(fetchFirestoreInboxData(auth.currentUser.uid));
        localStorage.setItem('user', JSON.stringify(
            { 
                'name': auth.currentUser.displayName,
                'email': auth.currentUser.email,
                'photo':  auth.currentUser.photoURL,
            }
            )
        )
    }, [dispatch])

    const dispatchLastNotified = useCallback(() =>
    {
        dispatch(authGetUser(auth.lastNotifiedUid))
        dispatch(fetchFirestoreDynamicListsData(auth.lastNotifiedUid))
        dispatch(fetchFirestoreInboxData(auth.lastNotifiedUid))
    }, [dispatch])

    return {dispatchCurrentUser, dispatchLastNotified}
} 