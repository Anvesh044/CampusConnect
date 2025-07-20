import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("student");

  const [name, setName] = useState("");
  const [tpoId, setTpoId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        uid,
        name,
        email,
        role: "student",
      });

      setSuccess("Registration successful! Please login.");
      setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (role === "tpo") {
        if (tpoId === "TPO777") {
          navigate("/tpo-dashboard");
        } else {
          setError("Invalid TPO ID");
        }
        return;
      }

      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const docSnap = await getDoc(doc(db, "users", uid));
      const userData = docSnap.data();

      navigate("/student-dashboard", {
        state: {
          name: userData.name,
          docId: uid,
        },
      });
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uid = user.uid;

      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid,
          name: user.displayName,
          email: user.email,
          role: "student",
        });
      }

      const userData = snap.data() || { name: user.displayName };
      navigate("/student-dashboard", {
        state: {
          name: userData.name,
          docId: uid,
        },
      });
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-700 via-white to-green-700 px-6 py-12">
  <div className="text-center absolute top-10 left-0 right-0">
    <h1 className="text-5xl font-extrabold tracking-wide font-serif drop-shadow-lg">
      <span className="text-green-900">CAMPUS</span><span className="text-blue-900">CONNECT</span>
    </h1>
    <p className="mt-2 text-sm italic">
  <span className="text-green-900">Empowering your future</span>
  <span className="text-blue-900">, one login at a time</span>
</p>

  </div>


      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl border border-green-200 rounded-2xl p-8 transition-all duration-500 animate-fade-in">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          {isRegister ? "📝 Register Account" : "🔐 Login to Continue"}
        </h2>

        {!isRegister && (
          <div className="flex justify-center gap-3 mb-4">
            {["student", "tpo"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-full border transition-all duration-200 text-sm font-semibold ${
                  role === r
                    ? "bg-green-600 text-white shadow"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-green-50"
                }`}
              >
                {r === "student" ? "🎓 Student" : "🧑‍💼 TPO"}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
          {/* Student Registration */}
          {isRegister && (
            <>
              <input
                placeholder="👤 Name"
                className="input-style"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="📧 Email"
                className="input-style"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="🔑 Password"
                className="input-style"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="🔁 Retype Password"
                className="input-style"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          {/* Student Login */}
          {!isRegister && role === "student" && (
            <>
              <input
                placeholder="📧 Email"
                className="input-style"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="🔒 Password"
                className="input-style"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          {/* TPO Login */}
          {!isRegister && role === "tpo" && (
            <input
              placeholder="🆔 Enter TPO ID"
              className="input-style"
              value={tpoId}
              onChange={(e) => setTpoId(e.target.value)}
            />
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {success && <p className="text-sm text-green-600 text-center">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-200"
          >
            {isRegister ? "✅ Register" : "➡ Login"}
          </button>
        </form>

        {!isRegister && role === "student" && (
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full py-2 bg-white text-blue-700 border border-blue-300 rounded-full flex items-center justify-center gap-2 hover:bg-blue-50"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        )}

        {role === "student" && (
          <p className="text-sm text-center mt-4">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-green-700 underline font-medium"
            >
              {isRegister ? "Already have an account? Login" : "New here? Register now"}
            </button>
          </p>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
        .input-style {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .input-style:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease-in-out forwards;
        }
        `}
      </style>
    </div>
  );
}
