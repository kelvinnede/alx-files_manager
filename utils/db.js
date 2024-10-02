// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.db = null;
    let host = '127.0.0.1';
    let port = 27017;
    let dbname = 'files_manager';
    if (process.env.DB_HOST) {
      host = process.env.DB_HOST;
    }
    if (process.env.DB_PORT) {
      port = process.env.DB_PORT;
    }
    if (process.env.DB_DATABASE) {
      dbname = process.env.DB_DATABASE;
    }
    const url = `mongodb://${host}:${port}`;
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (error) throw (error);
      this.db = client.db(dbname);
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    const nbusers = await this.db.collection('users').countDocuments();
    return nbusers;
  }

  async nbFiles() {
    const nbfiles = await this.db.collection('files').countDocuments();
    return nbfiles;
  }
}
const dbClient = new DBClient();
module.exports = dbClient;
