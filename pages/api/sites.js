import db from '@/library/firebase-admin';

export default async (_, res) => {
  const dbCollection = db.collection('sites');
  const snapshot = await dbCollection.get();
  let sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ sites });
};
