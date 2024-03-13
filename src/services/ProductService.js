import { getDatabase, ref, push, child, update, remove, get } from "firebase/database";
import { database } from "../firebase";
const db = ref(getDatabase(), "/products");

class ProductService {
    getAll() {
        return get(db).then((snapshot) => {
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

    create(product) {
        return push(db, product);
    }

    update(key, value) {
        return update(child(db, key), value);
    }

    delete(key) {
        return remove(child(db, key));
    }

    deleteMultiple(keys) {
        const promises = keys.map(key => this.delete(key));
        return Promise.all(promises);
    }

    deleteAll() {
        return remove(db);
    }
}

export default new ProductService();
