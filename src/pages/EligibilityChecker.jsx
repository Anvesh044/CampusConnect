import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default function EligibilityChecker() {
  const [userData, setUserData] = useState(null);
  const [eligibilityResults, setEligibilityResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEligibility = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userSnap = await getDoc(doc(db, 'users', user.uid));
        if (!userSnap.exists()) {
          console.error('User data not found!');
          setLoading(false);
          return;
        }

        const { cgpa = 0, backlogs = 0, branch = '' } = userSnap.data();
        setUserData({ cgpa, backlogs, branch });

        const drivesSnap = await getDocs(collection(db, 'drives'));
        const results = drivesSnap.docs.map(d => {
          const drive = d.data();
          const eli = drive.eligibility || {};
          const minCGPA = eli.minCGPA ?? 0;
          const backlogsAllowed = eli.backlogsAllowed || false;
          const branches = eli.branches || [];

          const eligible =
            parseFloat(cgpa) >= parseFloat(minCGPA) &&
            (backlogsAllowed || parseInt(backlogs, 10) === 0) &&
            branches.includes(branch);

          return {
            company: drive.companyName,
            eligible,
            criteria: {
              minCGPA,
              backlogsAllowed: backlogsAllowed ? 'Allowed' : 'Not Allowed',
              branches
            }
          };
        });

        setEligibilityResults(results);
      } catch (err) {
        console.error('Error fetching eligibility:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEligibility();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 font-semibold text-lg animate-pulse">🔍 Checking eligibility...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-green-800 mb-6">
          🎯 Placement Eligibility Checker
        </h2>

        {userData && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-inner mb-8 text-green-900">
            <p className="mb-1"><strong>🎓 Your CGPA:</strong> {userData.cgpa}</p>
            <p className="mb-1"><strong>🛑 Backlogs:</strong> {userData.backlogs}</p>
            <p><strong>📘 Branch:</strong> {userData.branch}</p>
          </div>
        )}

        <div className="grid gap-6">
          {eligibilityResults.map((res, idx) => (
            <div
              key={idx}
              className={`rounded-lg border-2 shadow-lg transition-all transform hover:scale-[1.01] p-5 ${
                res.eligible
                  ? 'bg-green-100 border-green-400 text-green-800'
                  : 'bg-red-100 border-red-400 text-red-800'
              }`}
            >
              <h3 className="text-xl font-bold mb-1">{res.company}</h3>
              <p className="font-medium">
                {res.eligible ? '✅ You are eligible!' : '❌ You are not eligible.'}
              </p>
              <div className="mt-2 text-sm text-gray-700">
                <p><strong>📊 Min CGPA:</strong> {res.criteria.minCGPA}</p>
                <p><strong>🚫 Backlogs:</strong> {res.criteria.backlogsAllowed}</p>
                <p><strong>🏷️ Branches:</strong> {res.criteria.branches.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
