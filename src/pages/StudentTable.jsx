import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const studentList = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setStudents(studentList);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const togglePlacement = async (id, currentStatus) => {
    try {
      const studentRef = doc(db, 'students', id);
      await updateDoc(studentRef, { placed: !currentStatus });

      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, placed: !s.placed } : s))
      );
    } catch (error) {
      console.error('Error updating placement status:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Branch', 'Email', 'USN', 'Placement Status'];
    const rows = students.map((s) => [
      s.name,
      s.branch,
      s.email,
      s.usn,
      s.placed ? 'Placed' : 'Not Placed',
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'students_list.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.branch?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🎓 Student Placement Status
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name, branch, email..."
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-2/3 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            ⬇️ Export CSV
          </button>
        </div>

        <div className="overflow-x-auto rounded-md shadow">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-green-200 text-gray-800 uppercase tracking-wide">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Branch</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">USN</th>
                <th className="p-3 border">Placement Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className={`hover:bg-green-50 transition ${
                      student.placed ? 'bg-green-50' : 'bg-white'
                    }`}
                  >
                    <td className="p-3 border">{student.name}</td>
                    <td className="p-3 border">{student.branch}</td>
                    <td className="p-3 border">{student.email}</td>
                    <td className="p-3 border">{student.usn}</td>
                    <td className="p-3 border font-semibold">
                      {student.placed ? (
                        <span className="text-green-700">Placed</span>
                      ) : (
                        <span className="text-red-600">Not Placed</span>
                      )}
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => togglePlacement(student.id, student.placed)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No students found.
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
