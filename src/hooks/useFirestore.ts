import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase/config";

type Image = {
    createAt: Date,
    userEmail: string,
    imageUrl: string
}

const useFirestore = (collectionName: string) => {
    const [docs, setDocs] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        let unsubscribe: () => void
        const getData = async () => {
            try{
                const q = query(collection(db, collectionName), orderBy("createAt", "desc"));
                unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const images: Image[] = [];
                    querySnapshot.forEach((doc) => {
                        const imageUrl = doc.data().imageUrl;
                        const createAt = doc.data().createAt.toDate();
                        const userEmail = doc.data().userEmail;
                        images.push({imageUrl, createAt, userEmail})
                    });
                    setDocs(images);
                    setIsLoading(false);
                });
            } catch(error){
                console.error(error);
                setIsLoading(false);
            }
        }

        getData();

        return () => unsubscribe && unsubscribe();

    }, [collectionName])

    return{
        docs, isLoading
    };
};

export default useFirestore;
