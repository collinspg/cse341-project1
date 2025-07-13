const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database already initialized!');
        return callback(null, database);
    }

    const connectionString = process.env.MONGODB_URI;

    if (!connectionString || !connectionString.startsWith('mongodb')) {
        return callback(new Error('MONGODB_URI is missing or invalid.'));
    }

    MongoClient.connect(connectionString)
        .then((client) => {
            database = client.db(); 
            console.log('Database connected successfully!');
            callback(null, database);
        })
        .catch((err) => {
            console.error('Database connection failed:', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized!');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase,
};
