import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';

const collection = () => getDB().collection('participants');

export async function createParticipant(data) {
  const now = new Date();
  const result = await collection().insertOne({
    status: 'pending',
    ...data,
    createdAt: now,
    updatedAt: now
  });
  return result.insertedId; 
}

export function listParticipants() {
  return collection().find().sort({ createdAt: -1 }).toArray();
}

export async function updateParticipant(id, patch) {
  return collection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } }
  );
}

export function deleteParticipant(id) {
  return collection().deleteOne({ _id: new ObjectId(id) });
}
