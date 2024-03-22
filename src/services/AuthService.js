import { firestore } from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Firestore_DB } from "./firestore_db";

class AuthService extends Firestore_DB {
    constructor() {
        super("/users");
    }

    getCurentUser() {
        let user = JSON.parse(localStorage.getItem('user'));

        return user;
    }

    create = async (email, name, id, password) => {
        await addDoc(collection(firestore, "users"), {
            name: name,
            email: email,
            user_id: id,
            password: password,
            role: "user"
        }).then(() => {
            console.log('successfully added');
        }).catch((error) => {
            console.log(error.message);
        });
    }

    getUser = async (id) => {
        try {
            const userRef = collection(firestore, 'users');
            const q = query(userRef, where('user_id', '==', id));
            const querySnapshot = await getDocs(q);
            let userData = null;
            
            querySnapshot.forEach((doc) => {
                userData = {id: doc.id, ...doc.data()};
            });
            return userData;
        } catch (error) {
            console.log(error.message);
        }
    }

    isLogin() {
        let role = '';
        let allow = false;
        if (this.getCurentUser() !== null) {
            if (this.getCurentUser().role === 'admin') {
                allow = true;
                role = 'admin';
            }else {
                role = 'user';
                allow = true;
            }
        } 
        return {role: role, allow: allow};
    }
}

export default new AuthService();