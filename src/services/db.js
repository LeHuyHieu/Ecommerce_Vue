import { getDatabase, ref, push, child, update, remove } from "firebase/database";

class DB {
    constructor(path) {
        this.db = ref(getDatabase(), path);
    }

    create(data) {
        return push(this.db, data);
    }

    update(key, value) {
        return update(child(this.db, key), value);
    }

    delete(key) {
        return remove(child(this.db, key));
    }

    deleteAll() {
        return remove(this.db);
    }
}

export {DB};
