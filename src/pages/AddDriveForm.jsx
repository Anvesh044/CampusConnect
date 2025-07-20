import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AddDriveForm() {
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    ctc: "",
    location: "",
    deadline: "",
    minCGPA: "",
    branches: [],
    backlogsAllowed: false,
    batch: ""
  });

  const branches = ["CSE", "ISE", "AIML", "EC", "Robotics", "Mech"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "branches") {
      setForm((prev) => ({
        ...prev,
        branches: checked
          ? [...prev.branches, value]
          : prev.branches.filter((b) => b !== value)
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "drives"), {
        companyName: form.companyName,
        role: form.role,
        ctc: form.ctc,
        location: form.location,
        deadline: form.deadline,
        eligibility: {
          minCGPA: parseFloat(form.minCGPA),
          branches: form.branches,
          backlogsAllowed: form.backlogsAllowed,
          batch: form.batch
        },
        createdAt: Timestamp.now()
      });
      toast.success("✅ Drive added successfully!");
      setForm({
        companyName: "",
        role: "",
        ctc: "",
        location: "",
        deadline: "",
        minCGPA: "",
        branches: [],
        backlogsAllowed: false,
        batch: ""
      });
    } catch (err) {
      toast.error("❌ Error adding drive: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-10 backdrop-blur-md bg-white/80 rounded-2xl shadow-2xl space-y-8 border border-green-300"
      >
        <h2 className="text-4xl font-extrabold text-green-800 text-center tracking-tight">📢 Add Placement Drive</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Company Name", name: "companyName", type: "text" },
            { label: "Role", name: "role", type: "text" },
            { label: "CTC (LPA)", name: "ctc", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Deadline", name: "deadline", type: "date" },
            { label: "Min CGPA", name: "minCGPA", type: "number", step: "0.1" },
            { label: "Batch Year", name: "batch", type: "text" }
          ].map(({ label, name, type, step }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              <input
                name={name}
                type={type}
                step={step}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">✅ Eligible Branches</h4>
          <div className="flex flex-wrap gap-4">
            {branches.map((b) => (
              <label key={b} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="branches"
                  value={b}
                  onChange={handleChange}
                  checked={form.branches.includes(b)}
                  className="accent-green-600"
                />
                {b}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-700 text-base">
          <input
            type="checkbox"
            name="backlogsAllowed"
            checked={form.backlogsAllowed}
            onChange={handleChange}
            className="accent-green-600"
          />
          <span>Backlogs Allowed</span>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-green-400"
          >
            ➕ Add Drive
          </button>
        </div>
      </form>
    </div>
  );
}
