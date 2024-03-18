import { ref, child, get, query, orderByKey, limitToLast } from "firebase/database";
import { database } from "../firebase";
import {DB} from "./db";

class OrderService extends DB{
    constructor() {
        super("/orders");
    }

    getAll() {
        return get(this.db).then((snapshot) => {
            const products = [];
            snapshot.forEach((childSnapshot) => {
                const product = childSnapshot.val();
                product.key = childSnapshot.key;
                products.push(product);
            });
            return products;
        }).catch((error) => {
            console.error("Error getting data:", error);
            throw error;
        });
    }

    get(key) {
        const productRef = child(ref(database), 'products/' + key);
        return get(productRef).then((snapshot) => {
            if (snapshot.exists()) {
                const productData = snapshot.val();
                productData.key = snapshot.key;
                return productData;
            } else {
                throw new Error('Product not found');
            }
        }).catch((error) => {
            console.error("Error getting product data:", error);
            throw error;
        });
    }

    deleteMultiple(keys) {
        const promises = keys.map(key => this.delete(key));
        return Promise.all(promises);
    }

    getHomeLimitProducts() {
        const sortedQuery = query(this.db, orderByKey(), limitToLast(8));

        return get(sortedQuery).then((snapshot) => {
            const products = [];
            snapshot.forEach((childSnapshot) => {
                const product = childSnapshot.val();
                product.key = childSnapshot.key;
                products.push(product);
            });
            return products.reverse();
        }).catch((error) => {
            console.error("Error getting last six products:", error);
            throw error;
        });
    }
}

export default new OrderService();
