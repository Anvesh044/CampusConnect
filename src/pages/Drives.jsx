import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function StudentDrives() {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'drives'));
        const driveList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDrives(driveList);
      } catch (error) {
        console.error('Error fetching drives:', error);
      }
    };

    fetchDrives();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-green-800 mb-10">
          📢 Latest Placement Drives
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {drives.length > 0 ? (
            drives.map((drive) => (
              <div
                key={drive.id}
                className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border-l-4 border-green-500 p-6 transform hover:scale-[1.02] transition-all duration-200"
              >
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  {drive.companyName}
                </h3>
                <p className="text-gray-700"><strong>🎯 Role:</strong> {drive.role}</p>
                <p className="text-gray-700"><strong>💰 CTC:</strong> {drive.ctc}</p>
                <p className="text-gray-700"><strong>📍 Location:</strong> {drive.location}</p>
                <p className="text-gray-700"><strong>🎓 Batch:</strong> {drive.eligibility?.batch}</p>
                <p className="text-gray-700"><strong>📊 Min CGPA:</strong> {drive.eligibility?.minCGPA}</p>
                <p className="text-gray-700">
                  <strong>🛑 Backlogs:</strong>{' '}
                  {drive.eligibility?.backlogsAllowed ? 'Allowed' : 'Not Allowed'}
                </p>
                <p className="text-gray-700">
                  <strong>🏷️ Branches:</strong>{' '}
                  {drive.eligibility?.branches?.join(', ')}
                </p>
                <p className="text-gray-700"><strong>⏰ Deadline:</strong> {drive.deadline}</p>
                <p className="text-xs text-gray-500 mt-3">
                  📅 Posted on:{' '}
                  {drive.createdAt?.seconds
                    ? new Date(drive.createdAt.seconds * 1000).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              🚫 No drives available currently.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
