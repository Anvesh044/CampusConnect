import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [usn, setUsn] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleUpload = async () => {
    if (!file || !usn) {
      toast.error("Please select a PDF file and enter your USN");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are supported.");
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, 'resumes', usn), {
        uploadedAt: new Date(),
        filename: file.name
      });

      toast.success("✅ Resume uploaded successfully!");
      setUsn('');
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("❌ Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileURL);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">📄 Upload Your Resume</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your USN"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none transition"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
          />

          <input
            type="file"
            accept=".pdf"
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-dashed border-gray-400 rounded-lg cursor-pointer transition hover:bg-green-100"
            onChange={handleFileChange}
          />

          {previewUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-green-700">📄 Preview:</h3>
              <iframe
                src={previewUrl}
                title="PDF Preview"
                className="w-full h-96 border border-green-500 rounded-md shadow"
              />
            </div>
          )}

          <div className="text-center mt-6">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </div>
        </div>
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
}
