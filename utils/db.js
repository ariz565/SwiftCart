import mongoose from 'mongoose';

// Tracks connection state
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log('Already connected to the database.');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use previous connection to the database.');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URL);
  console.log('New connection to the database.');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not disconnecting from the database.');
    }
  }
}

const db = { connectDb, disconnectDb };
export default db;
