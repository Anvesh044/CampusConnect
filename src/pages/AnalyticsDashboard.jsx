import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const [branchData, setBranchData] = useState({});
  const [recruiterData, setRecruiterData] = useState({});
  const [dynamicStats, setDynamicStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    unplacedStudents: 0,
    avgOffers: 0
  });
  const [summaryStats, setSummaryStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const studentsSnapshot = await getDocs(collection(db, "students"));
      const applicationsSnapshot = await getDocs(collection(db, "applications"));
      const statsDoc = await getDoc(doc(db, "placements", "stats"));

      const students = studentsSnapshot.docs.map(doc => doc.data());
      const applications = applicationsSnapshot.docs.map(doc => doc.data());

      prepareStats(students, applications);
      prepareBranchChart(students);
      prepareRecruiterChart(applications);

      if (statsDoc.exists()) {
        setSummaryStats(statsDoc.data());
      }
    };

    fetchData();
  }, []);

  const prepareStats = (students, applications) => {
    const totalStudents = students.length;
    const placedStudents = students.filter(s => s.placed).length;
    const unplacedStudents = totalStudents - placedStudents;

    const studentOfferCount = {};
    applications.forEach(app => {
      if (app.status === "selected") {
        studentOfferCount[app.studentId] = (studentOfferCount[app.studentId] || 0) + 1;
      }
    });

    const totalOffers = Object.values(studentOfferCount).reduce((a, b) => a + b, 0);
    const avgOffers = placedStudents > 0 ? (totalOffers / placedStudents).toFixed(2) : 0;

    setDynamicStats({
      totalStudents,
      placedStudents,
      unplacedStudents,
      avgOffers
    });
  };

  const prepareBranchChart = (students) => {
    const branchCounts = {};
    students.forEach(s => {
      if (s.placed) {
        branchCounts[s.branch] = (branchCounts[s.branch] || 0) + 1;
      }
    });

    setBranchData({
      labels: Object.keys(branchCounts),
      datasets: [{
        label: "Students Placed",
        data: Object.values(branchCounts),
        backgroundColor: "#3b82f6"
      }]
    });
  };

  const prepareRecruiterChart = (applications) => {
    const recruiterCounts = {};
    applications.forEach(app => {
      if (app.status === "selected") {
        recruiterCounts[app.companyName] = (recruiterCounts[app.companyName] || 0) + 1;
      }
    });

    setRecruiterData({
      labels: Object.keys(recruiterCounts),
      datasets: [{
        label: "Top Recruiters",
        data: Object.values(recruiterCounts),
        backgroundColor: [
          "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#ec4899", "#14b8a6"
        ]
      }]
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-800">📈 Placement Analytics Dashboard</h2>

      {/* 🔹 DYNAMIC STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow p-4 rounded text-center">
          <h4 className="text-gray-600 font-medium">Total Students</h4>
          <p className="text-2xl font-bold text-blue-600">{dynamicStats.totalStudents}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h4 className="text-gray-600 font-medium">Placed</h4>
          <p className="text-2xl font-bold text-green-600">{dynamicStats.placedStudents}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h4 className="text-gray-600 font-medium">Not Placed</h4>
          <p className="text-2xl font-bold text-red-600">{dynamicStats.unplacedStudents}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h4 className="text-gray-600 font-medium">Avg Offers</h4>
          <p className="text-2xl font-bold text-purple-600">{dynamicStats.avgOffers}</p>
        </div>
      </div>

      {/* 🔸 FIRESTORE STATIC STATS */}
      {summaryStats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-50 p-4 shadow rounded text-center border border-green-100">
            <h4 className="text-green-800 font-medium">Highest Package</h4>
            <p className="text-xl font-bold">{summaryStats.highestPackage} LPA</p>
          </div>
          <div className="bg-green-50 p-4 shadow rounded text-center border border-green-100">
            <h4 className="text-green-800 font-medium">Lowest Package</h4>
            <p className="text-xl font-bold">{summaryStats.lowestPackage} LPA</p>
          </div>
          <div className="bg-green-50 p-4 shadow rounded text-center border border-green-100">
            <h4 className="text-green-800 font-medium">Average Package</h4>
            <p className="text-xl font-bold">{summaryStats.averagePackage} LPA</p>
          </div>
        </div>
      )}

      {/* 🔹 CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="bg-white p-5 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">Placed Students per Branch</h3>
          {branchData.labels && <Bar data={branchData} />}
        </div>
      </div>

  <div className="bg-white p-5 shadow rounded">
  <h3 className="text-xl font-semibold mb-4">Top Recruiters</h3>

  {/* 🔽 Company Logos Collage */}
  <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center">
    {[
      { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
      { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
      { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
       { name: "Zomato", logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png" },
      { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg" },
      { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
      { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
      { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
      { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
      { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
      { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
      { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" }
    ].map(company => (
      <div key={company.name} className="w-20 h-14 flex items-center justify-center">
        <img
          src={company.logo}
          alt={company.name}
          className="object-contain h-full"
          title={company.name}
        />
      </div>
    ))}
  </div>
</div>




    </div>
  );
}
