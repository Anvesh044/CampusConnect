import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function StudentRow({ student, onPlaced }) {
  const markAsPlaced = async () => {
    await updateDoc(doc(db, "students", student.id), { placed: true });
    onPlaced(student.id);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3 border">{student.name}</td>
      <td className="p-3 border">{student.branch}</td>
      <td className="p-3 border">{student.cgpa}</td>
      <td className="p-3 border">{student.placed ? "Yes" : "No"}</td>
      <td className="p-3 border space-x-2">
        <a
          href={student.resumeURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Resume
        </a>
        {!student.placed && (
          <button
            onClick={markAsPlaced}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Mark as Placed
          </button>
        )}
      </td>
    </tr>
  );
}
