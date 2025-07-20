import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

export default function SendNotification() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) {
      toast.error('⚠️ Please fill in both title and message');
      return;
    }

    try {
      await addDoc(collection(db, 'notifications'), {
        title,
        message,
        createdAt: serverTimestamp(),
      });

      toast.success('✅ Notification sent successfully!');
      setTitle('');
      setMessage('');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to send notification');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md border border-green-200 shadow-lg rounded-xl p-8 w-full max-w-xl transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          📢 Send Notification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="📌 Title of the Notification"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <textarea
            rows="5"
            placeholder="📝 Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            🚀 Send Notification
          </button>
        </form>
      </div>
    </div>
  );
}
