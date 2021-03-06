import * as SQLite from 'expo-sqlite';

const conn = SQLite.openDatabase('db.db');

class Database  {
    getConnection() {
        return conn;
    }
}

module.exports = new Database();