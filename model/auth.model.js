import { connectToDatabase } from '../db';

export default async (req, res) => {
    const { db } = await connectToDatabase();
}