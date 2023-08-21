import { getDocs, collection } from "firebase/firestore";
import { getDB } from "./firebase";

const collection_name = "shoes"

export const getShoes = async () => {

    const doc_refs = await getDocs(collection(getDB(), collection_name))
    
    const res: { id: string; }[] = []

    doc_refs.forEach((doc) => {
        res.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return res
}