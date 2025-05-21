import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: any; promise: any } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

if(!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let catched = global.mongoose;
if(!catched){
    catched = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if(!catched) return;
    if(catched.conn) return;
    if(!catched.promise){
        catched.promise = mongoose.connect(MONGODB_URI,{
            bufferCommands: false,
        });
    }
    catched.conn = await catched.promise;
    return catched.conn;
}