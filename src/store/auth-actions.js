import { authActions } from './auth-slice';
import { db } from '../firebase'; 
import { getDocs, collection, where, query} from '@firebase/firestore';

export const authGetUser = (uid) =>
{
    return async (dispatch) => {
        const fetchData = async () => 
        {
            const userCollectionRef = query(collection(db, "users"), where("userId", "==", uid));
            try
            {
                const data = await getDocs(userCollectionRef);
                const collectionId = data.docs.map((doc) => ({
                    id: doc.id,
                })) 
                return collectionId[0].id;
            }
            catch(err)
            {
                console.log("error fetch")
                console.log(err)
            }
            
        }

        const data = await fetchData();
        dispatch(authActions.setCollectionId(data));
    }
}

export const searchUser = (uid) =>
{
    return async (dispatch) => {
        const fetchData = async () => 
        {
            const userCollectionRef = query(collection(db, "users"), where("userId", "==", uid));
            try
            {
                const data = await getDocs(userCollectionRef);
                const collectionId = data.docs.map((doc) => ({
                    id: doc.id,
                })) 
                let ret;
                console.log(collectionId)
                console.log('id' in collectionId[0])
                if ('id' in collectionId[0])
                { 
                    ret = collectionId[0].id;
                } 
                else
                {
                    ret = "NO";
                }
                return ret; 
            }
            catch(err)
            {
                console.log("error fetch")
                console.log(err)
                return "NO"
            }
            
        }

        const data = await fetchData();
        return data;
    }
}

