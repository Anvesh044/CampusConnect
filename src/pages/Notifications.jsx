import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function StudentNotifications({ branch }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const q = query(
          collection(db, 'notifications'),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, [branch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-green-800 text-center">
          📬 Notifications
        </h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No notifications yet.</p>
        ) : (
          <ul className="space-y-6">
            {notifications.map((note) => (
              <li
                key={note.id}
                className="bg-white border-l-4 border-green-600 shadow-md rounded-lg p-5 transition hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-green-700">
                      {note.title}
                    </h3>
                    <p className="text-gray-700 mt-1">{note.message}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-3">
                  📅 {note.createdAt?.toDate().toLocaleString() || 'Unknown time'}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
