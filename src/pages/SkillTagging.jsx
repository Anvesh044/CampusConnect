import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const predefinedSkills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'C++', 'Java',
  'MongoDB', 'SQL', 'Firebase', 'HTML', 'CSS', 'Git',
  'Machine Learning', 'Data Structures', 'Express', 'Bootstrap',
  'Tailwind', 'AWS', 'Docker', 'Linux'
];

export default function SkillTagging() {
  const [usn, setUsn] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchResumeText = async () => {
    if (!usn) {
      toast.error("Enter your USN first");
      return;
    }

    try {
      setLoading(true);
      const docRef = doc(db, 'resumes', usn);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const text = docSnap.data().text || docSnap.data().rawText || '';
        setResumeText(text);

        const detected = predefinedSkills.filter(skill =>
          text.toLowerCase().includes(skill.toLowerCase())
        );
        setSkills(detected.join(', '));
        toast.info("✅ Skills auto-detected from resume (OCR-based)");
      } else {
        toast.info("No resume found for this USN.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resume text");
    } finally {
      setLoading(false);
    }
  };

  const saveSkills = async () => {
    if (!skills || !usn) {
      toast.error("Missing skills or USN");
      return;
    }

    try {
      await updateDoc(doc(db, 'resumes', usn), {
        skills: skills.split(',').map(skill => skill.trim())
      });
      toast.success("✅ Skills updated!");
    } catch (err) {
      console.error(err);
      toast.error("Error saving skills");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">🧠 Skill Tagging (OCR-powered)</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none transition"
          />

          <button
            onClick={fetchResumeText}
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : '🔍 Load Resume Text'}
          </button>

          {resumeText && (
            <>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner max-h-64 overflow-y-auto border border-green-200">
                <p className="text-sm whitespace-pre-wrap text-gray-700">{resumeText}</p>
              </div>

              <div>
                <label className="block font-medium text-green-700 mb-1">
                  ✍️ Edit Auto-detected Skills:
                </label>
                <input
                  type="text"
                  placeholder="e.g., Python, React, Firebase"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none transition"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={saveSkills}
                  className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  💾 Save Skills
                </button>
              </div>
            </>
          )}
        </div>

        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
}
