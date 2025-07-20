import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

export default function StudentOfferLetter() {
  const [pdfBase64, setPdfBase64] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentUSN = "4SF23CS002"; // doc ID in Firestore

  useEffect(() => {
    const fetchOfferLetter = async () => {
      try {
        const docRef = doc(db, "offerLetters", studentUSN);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.base64PDF) {
            setPdfBase64(data.base64PDF);
          } else {
            toast.info("📬 Offer letter found but no PDF data available.");
          }
        } else {
          toast.info("❌ No offer letter found for your USN.");
        }
      } catch (error) {
        console.error("Error fetching offer letter:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchOfferLetter();
  }, [studentUSN]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">
          📄 Your Offer Letter
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">Loading offer letter...</p>
        ) : pdfBase64 ? (
          <div className="rounded overflow-hidden border-2 border-green-600 shadow">
            <iframe
              src={pdfBase64}
              title="Offer Letter PDF"
              width="100%"
              height="600px"
              className="rounded"
            />
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No offer letter uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
