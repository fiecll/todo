import mongoose, { Connection } from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | { conn: Connection | null; promise: Promise<Connection> | null }
    | undefined;
}

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Connection | undefined> {
  if (!cached) return;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
