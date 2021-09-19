import { getAllSites } from '@/library/db-admin';
import db from '@/library/firebase-admin';

export default async (_, res) => {
  const { sites, error } = await getAllSites();

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ sites });
};
