import { collection, getDocs, where, query } from "firebase/firestore";
import {Firestore_DB} from "./firestore_db";
import { firestore } from "@/firebase";

class OrderService extends Firestore_DB{
    constructor() {
        super("/orders");
    }

    getUserOrder = async (id) => {
        try {
            const orderRef = collection(firestore, 'orders');
            const q = query(orderRef, where('user_id', '==', id));
            const querySnapshot = await getDocs(q);
            let userOrderData = [];
            
            querySnapshot.forEach((doc) => {
                userOrderData.push(doc.data());
            });
            return userOrderData;
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default new OrderService();
