import express from 'express';

const router = express.Router();

// Save coordinates endpoint
router.post('/coordinates', async (req, res) => {
  try {
    console.log(req.body);
    const { bbox, dateRange, username } = req.body;
    // You can add validation and save to DB here
    // Example: Save to IndexesData collection if needed
    // await IndexesData.create({ ...bbox, ...dateRange, username });
    res.status(200).json({ message: 'Coordinates received', bbox, dateRange, username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
