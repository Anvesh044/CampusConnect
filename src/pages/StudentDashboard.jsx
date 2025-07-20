// StudentDashboard.jsx — Enhanced with Tailwind UI (Green Theme)
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { FaUserCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', usn: '', branch: '', yearOfPassing: '',
    cgpa: '', gender: '', age: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const branches = ['CSE', 'ISE', 'AIML', 'EC', 'Mech', 'Robotics', 'Civil'];

  useEffect(() => {
    (async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return setLoading(false);
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setStudentData(data);
          setFormData({
            name: data.name || user.displayName || '',
            email: data.email || user.email || '',
            usn: data.usn || '',
            branch: data.branch || '',
            yearOfPassing: data.yearOfPassing || '',
            cgpa: data.cgpa || '',
            gender: data.gender || '',
            age: data.age || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSave = async () => {
    try {
      const auth = getAuth();
      await updateDoc(doc(db, 'users', auth.currentUser.uid), formData);
      setStudentData(formData);
      toast.success('✅ Profile saved!');
      setShowProfileModal(false);
    } catch {
      toast.error('❌ Failed to save profile');
    }
  };

  const isRoot = location.pathname === "/student-dashboard";
  const carouselItems = [
    { name: "Ravi Kumar", company: "Google", package: "₹21 LPA", image: "https://randomuser.me/api/portraits/men/11.jpg" },
    { name: "Sneha Mehta", company: "Amazon", package: "₹19 LPA", image: "https://randomuser.me/api/portraits/women/25.jpg" },
    { name: "Aakash Yadav", company: "Microsoft", package: "₹20.5 LPA", image: "https://randomuser.me/api/portraits/men/34.jpg" },
    { name: "Neha Desai", company: "Uber", package: "₹18 LPA", image: "https://randomuser.me/api/portraits/women/30.jpg" },
    { name: "Kunal Rathi", company: "Walmart", package: "₹17.5 LPA", image: "https://randomuser.me/api/portraits/men/22.jpg" },
  ];

  const sliderSettings = {
    dots: true, infinite: true, speed: 600,
    slidesToShow: 2, slidesToScroll: 2,
    autoplay: true, autoplaySpeed: 5000, arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  const companyIcons = [
    'google', 'oneplus', 'panasonic', 'tcs', 'wipro', 'infosys',
    'paypal', 'paytm', 'airbnb', 'hcl', 'flipkart', 'zoho',
    'byjus', 'samsung', 'apple', 'motorola', 'huawei', 'qualcomm',
    'airbus', 'pinterest'
  ];

  if (loading) return <p className="p-6 text-green-600 font-medium">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white flex flex-col p-5 space-y-6">
        <h2 className="text-2xl font-extrabold font-serif tracking-wide cursor-pointer"
          onClick={() => navigate("/student-dashboard")}>
          🎓 CampusConnect
        </h2>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          {["resume-upload", "skill-tagging", "eligibility-checker", "placement-stats", "drives", "notifications", "offer-letter"].map(path => (
            <button key={path} onClick={() => navigate(path)}
              className="hover:bg-green-600 px-3 py-2 rounded text-left transition">
              {path.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </nav>
        <div className="mt-auto text-xs opacity-80">© 2025 CampusConnect</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative overflow-y-auto">
        {/* Profile */}
        <div className="absolute top-6 right-6 z-50">
          <div className="p-[6px] rounded-full bg-gradient-to-tr from-green-500 to-lime-400">
            <div className="bg-white p-[6px] rounded-full cursor-pointer"
              onClick={() => setShowProfileModal(true)}>
              <FaUserCircle className="text-4xl text-gray-700 hover:text-green-700 transition" />
            </div>
          </div>
        </div>

        {isRoot && (
          <>
            <h1 className="text-3xl font-bold text-green-800 mb-10">Welcome to Your Dashboard!</h1>

            {/* Carousel */}
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <Slider {...sliderSettings}>
                {carouselItems.map((c, i) => (
                  <div key={i} className="p-4">
                    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6 h-full transition hover:scale-105 duration-300">
                      <img src={c.image} alt={c.name} className="w-24 h-24 rounded-full border-4 border-green-500 shadow" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{c.name}</h3>
                        <p className="text-gray-600">{c.company}</p>
                        <p className="text-green-700 font-semibold text-lg">{c.package}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Company Logos */}
            <div className="mt-12 px-4 md:px-12">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-800">
                Companies Visiting Our Campus
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center items-center">
                {companyIcons.map((c, idx) => (
                  <img key={idx} src={`https://cdn.simpleicons.org/${c}`}
                    alt={`${c} logo`}
                    className="w-12 h-12 md:w-16 md:h-16 grayscale hover:grayscale-0 transition duration-300" />
                ))}
              </div>
            </div>
          </>
        )}

        <Outlet />

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md animate-fadeIn">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Edit Profile</h2>
              <div className="space-y-3">
                {["name", "email", "usn", "yearOfPassing", "cgpa", "gender", "age"].map(field => (
                  <input key={field} name={field} type={field === "email" ? "email" : "text"}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={formData[field]} readOnly={field === "name" || field === "email"}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-green-600 text-gray-700"
                  />
                ))}
                <select name="branch" value={formData.branch} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-gray-700">
                  <option value="">Select Branch</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setShowProfileModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">Cancel</button>
                <button onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Save</button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
}
