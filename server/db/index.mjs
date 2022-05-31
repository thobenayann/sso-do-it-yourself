export default {
    "admin@example.com": {
        "firstName": "Admin",
        "lastName": "Mystère",
        "password": "testtest",
        "github": "chikamichi"
    }
}

/**
 * Find a record by key in database
 * @param {*} db 
 * @param {*} key 
 * @returns Object or false
 */

export const find = (db, key) => {
    if (Object.keys(db).includes(key)) {
        return db[key];
    } else {
        return false;
    }
}