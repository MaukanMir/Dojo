// react imports here
import { useEffect, useState } from "react"
// firestore imports here
import { projectFirestore } from "../Firebase/config"

export const useDocument = (collection, id)=>{
    const [document, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    //realtime data from document
    useEffect(()=>{
        const ref = projectFirestore.collection(collection).doc(id);
        const unsubscribe = ref.onSnapshot((snapshot)=>{
            if(snapshot.data()){
                setDocuments({
                    ...snapshot.data(),
                    id:snapshot.id
                })
                setError(null)
            }else{
                setError("no such document exists")
            }
        },(error)=>{
            console.log(error)
            setError("failed to get document");
        })
        return () => unsubscribe();

    },[collection,id])

    return {document, error}
}