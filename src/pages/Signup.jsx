import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === form.email);

    if (existingUser) {
      toast.error("Email already registered! Please log in.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(form));

    toast.success("Account created successfully!");

    setTimeout(() => {
      if (form.role === "admin") navigate("/admin-dashboard");
      else if (form.role === "faculty") navigate("/faculty-dashboard");
      else navigate("/student-dashboard");
    }, 1200);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 border-t-4 border-green-500">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={form.name}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Role</label>
            <select
              name="role"
              onChange={handleChange}
              value={form.role}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button onClick={() => navigate("/login")}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-700 font-semibold cursor-pointer"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
