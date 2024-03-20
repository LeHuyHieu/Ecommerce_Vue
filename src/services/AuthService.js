import { firestore } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

class AuthService {
    getCurentUser() {
        let user = JSON.parse(localStorage.getItem('user'));

        return user;
    }

    create = async (email, name, id) => {
        await addDoc(collection(firestore, "users"), {
            name: name,
            email: email,
            user_id: id,
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
                userData = doc.data();
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