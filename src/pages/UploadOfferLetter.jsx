import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

export default function UploadOfferLetter() {
  const [file, setFile] = useState(null);
  const [studentUSN, setStudentUSN] = useState('');

  const handleUpload = async () => {
    if (!file || !studentUSN.trim()) {
      toast.error('⚠️ Please select a file and enter a valid student USN');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;

        await setDoc(doc(db, 'offerLetters', studentUSN.trim()), {
          base64PDF: base64,
          uploadedAt: new Date(),
        });

        toast.success('✅ Offer letter uploaded successfully!');
        setFile(null);
        setStudentUSN('');
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      toast.error('❌ Upload failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md border border-green-200 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          📤 Upload Offer Letter
        </h2>

        <input
          type="text"
          placeholder="🎓 Enter Student USN"
          value={studentUSN}
          onChange={(e) => setStudentUSN(e.target.value)}
          className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-4 text-sm"
        />

        {file && (
          <div className="mb-4 text-green-700 text-sm">
            📄 <strong>Selected:</strong> {file.name}
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 rounded-lg"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
