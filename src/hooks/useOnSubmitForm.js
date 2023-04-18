import StoreModel from '../models/storeModel';
import { collection, addDoc} from '@firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, useSearchParams } from 'react-router-dom';


export default function useOnSubmitForm () 
{
    const userCollectionRef = collection(db, "users");
    const emptyStore = new StoreModel();
    const navigate = useNavigate();
    
    //this is for determining if the user entered from the 
    //login form or the signup one.
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    const onAddNewDatabase = async (name) => {
        await addDoc(userCollectionRef,
            {
                name: name,
                store:JSON.parse(JSON.stringify(emptyStore)),
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
    const onSubmit = async (name, email, password, myEvent) => {
        myEvent.preventDefault();
        if(!isLogin)
        {
            await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                await updateProfile(userCredential.user, {displayName: name});
            })
            .then(()=>{ 
                onAddNewDatabase(name);
            })
            .catch((error) => 
            {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });   
        }
        else
        {
            signInWithEmailAndPassword(auth, email, password)
            .then(()=>
            {
                navigate("/lists/inbox")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
        }
    }

    return { onSubmit }
}