import admin from '../../lib/firebase-admin';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { date, time } = req.body;

    try {
        const docRef = await admin.firestore().collection('slots').add({ date, time });
        res.status(200).json({ message: 'Slot created', id: docRef.id });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create slot' });
    }
}
