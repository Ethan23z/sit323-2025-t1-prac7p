const express = require('express');
const { MongoClient } = require('mongodb');

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const uri = `mongodb://${user}:${pass}@mongo-service:27017/mydatabase?authSource=admin`;

const client = new MongoClient(uri, { useUnifiedTopology: true });
const app = express();
const PORT = process.env.PORT || 3000;

async function initData() {
  try {
    await client.connect();
    const db = client.db('mydatabase');
    const col = db.collection('test');

    const { insertedId } = await col.insertOne({ name: 'Alice', age: 30 });
    console.log('Inserted:', insertedId);
    const doc = await col.findOne({ name: 'Alice' });
    console.log('Found:', doc);
    await col.updateOne({ name: 'Alice' }, { $set: { age: 31 } });
    console.log('Updated age to 31');
    await col.deleteOne({ name: 'Alice' });
    console.log('Deleted document');
  } catch (err) {
    console.error(err);
  }
}

app.get('/', (req, res) => {
  res.send('Service is up and running');
});

app.listen(PORT, async () => {
  console.log(`HTTP server listening on port ${PORT}`);
  await initData();
  console.log('Initialization complete');
});
