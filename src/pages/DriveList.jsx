import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function DriveList() {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const fetchDrives = async () => {
      const snapshot = await getDocs(collection(db, "drives"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDrives(data);
    };
    fetchDrives();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this drive?");
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, "drives", id));
      setDrives((prev) => prev.filter((drive) => drive.id !== id));
      toast.success("✅ Drive deleted");
    } catch (err) {
      toast.error("❌ Failed to delete drive");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center">📋 All Placement Drives</h2>

        <div className="overflow-x-auto rounded-xl border border-green-200 shadow-md">
          <table className="w-full border-collapse bg-white text-gray-700 rounded-xl overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">CTC</th>
                <th className="py-3 px-4 text-left">Deadline</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drives.map((d, index) => (
                <tr key={d.id} className={`${index % 2 === 0 ? "bg-white" : "bg-green-50"} hover:bg-green-100`}>
                  <td className="py-3 px-4">{d.companyName}</td>
                  <td className="py-3 px-4">{d.role}</td>
                  <td className="py-3 px-4">{d.ctc}</td>
                  <td className="py-3 px-4">{d.deadline}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {drives.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-gray-500">
                    No drives available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
