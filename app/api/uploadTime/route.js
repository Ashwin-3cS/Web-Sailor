import UserTimeCal from '@models/userTimeCal';
import { connectTodb } from '@utils/database';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { userId, totalViewTime } = req.body;

    // Connect to MongoDB
    await connectTodb();

    // Create a new UserTimeCal entry
    const newUserTimeCal = new UserTimeCal({
      creator: userId, // Assuming userId is ObjectId of the user
      totalViewTime: totalViewTime // Assuming totalViewTime is in milliseconds
    });

    // Save to database
    await newUserTimeCal.save();

    res.status(201).json({ message: 'View time recorded successfully' });
  } catch (error) {
    console.error('Error recording view time:', error);
    res.status(500).json({ message: 'Failed to record view time' });
  }
}
