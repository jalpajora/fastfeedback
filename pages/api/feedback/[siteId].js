import { getAllFeedback } from '@/library/db-admin';

export default async (req, res) => {
  const siteId = req.query.siteId;
  const { error, feedback } = await getAllFeedback(siteId);

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ feedback });
};
