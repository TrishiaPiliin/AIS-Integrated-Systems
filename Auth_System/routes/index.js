import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'AIS Auth System is running!' });
});

export default router;