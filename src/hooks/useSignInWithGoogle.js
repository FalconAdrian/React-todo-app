// 3rd Party
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from '@firebase/firestore';
import { signInWithPopup } from "firebase/auth";
// actions and files 
import { auth, db, googleProvider } from '../firebase';
import { searchUser } from '../store/auth-actions';
// models
import StoreModel from '../models/storeModel';

export default function useSignInWithGoogle()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCollectionRef = collection(db, "users");
    const emptyStore = new StoreModel();
    
    //function for adding a new collection item into firestore.
    const onAddNewCollection = async (name) => 
    {
        await addDoc(userCollectionRef,
            {
                name: name,
                store:emptyStore,
                userId: auth?.currentUser?.uid,
            }
          )
          .then(navigate('/lists/inbox'))
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            })
    }
    
    const signInWithGoogle = async () =>
    {
        try
        {
            await signInWithPopup(auth, googleProvider)
            .then(async (userCredential) => 
            {
                console.log(userCredential)
                console.log(userCredential.user.uid)
                await dispatch(searchUser(userCredential.user.uid))
                .then((data)=>
                {
                    (data === "NO") ? onAddNewCollection(userCredential.user.displayName)
                                    : navigate('/lists/inbox') 
                })
            })
        } 
        catch (err) 
        {
            console.log("signInGoogle error:")
            console.error(err);
        }
    }

    return {
        signInWithGoogle
    }

}