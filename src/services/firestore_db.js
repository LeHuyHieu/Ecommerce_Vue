import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

class Firestore_DB {
    constructor(collectionName) {
        this.collectionRef = collection(firestore, collectionName);
    }

    async create(data) {
        try {
            const docRef = await addDoc(this.collectionRef, data);
            return docRef.id;
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
        }
    }

    async update(docId, data) {
        try {
            const docRef = doc(this.collectionRef, docId);
            await updateDoc(docRef, data);
            return true;
        } catch (error) {
            console.error("Error updating document: ", error);
            throw error;
        }
    }

    async delete(docId) {
        try {
            const docRef = doc(this.collectionRef, docId);
            await deleteDoc(docRef);
            return true;
        } catch (error) {
            console.error("Error deleting document: ", error);
            throw error;
        }
    }

    async getAll() {
        try {
            const querySnapshot = await getDocs(this.collectionRef);
            const orders = [];
            querySnapshot.forEach(doc => {
                orders.push({ id: doc.id, ...doc.data() });
            });
            return orders;
        } catch (error) {
            console.error("Error getting documents: ", error);
            throw error;
        }
    }

    async getItem(key) {
        try {
            const docRef = doc(this.collectionRef, key);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (error) {
            console.error("Error getting document: ", error);
            throw error;
        }
    }
}

export { Firestore_DB };
