import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PlacementStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const docRef = doc(db, "placements", "stats");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStats(docSnap.data());
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-20 text-lg text-green-600 animate-pulse">📊 Loading placement stats...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-green-800 mb-8">
          📊 Placement Statistics (Last 2 Years)
        </h1>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          <div className="bg-green-100 p-4 rounded-lg shadow hover:scale-105 transition-transform">
            <p className="text-gray-600">Total Placed</p>
            <p className="text-2xl font-bold text-green-700">{stats.totalPlaced}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow hover:scale-105 transition-transform">
            <p className="text-gray-600">Highest Package</p>
            <p className="text-2xl font-bold text-blue-700">{stats.highestPackage} LPA</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow hover:scale-105 transition-transform">
            <p className="text-gray-600">Lowest Package</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.lowestPackage} LPA</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg shadow hover:scale-105 transition-transform">
            <p className="text-gray-600">Average Package</p>
            <p className="text-2xl font-bold text-purple-700">{stats.averagePackage} LPA</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-green-800 text-center">🏢 Company-wise Placements</h2>
            <Bar
              data={{
                labels: Object.keys(stats.companyWise),
                datasets: [{
                  label: '# of Students',
                  data: Object.values(stats.companyWise),
                  backgroundColor: 'rgba(34, 197, 94, 0.7)' // Tailwind green-500
                }]
              }}
              options={{
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: true }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-green-800 text-center">🎓 Branch-wise Placements</h2>
            <Pie
              data={{
                labels: Object.keys(stats.branchWise),
                datasets: [{
                  data: Object.values(stats.branchWise),
                  backgroundColor: [
                    '#22c55e', // green-500
                    '#60a5fa', // blue-400
                    '#f87171', // red-400
                    '#facc15', // yellow-400
                    '#a78bfa', // violet-400
                    '#34d399', // emerald-400
                    '#fb923c', // orange-400
                  ]
                }]
              }}
              options={{
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementStats;
