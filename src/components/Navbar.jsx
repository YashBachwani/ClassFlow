import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">ClassFlow</h1>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/admin" className="hover:text-gray-200 transition">Admin</Link>
          <Link to="/faculty" className="hover:text-gray-200 transition">Faculty</Link>
          <Link to="/student" className="hover:text-gray-200 transition">Student</Link>
        </nav>
      </div>
    </header>
    </>
  );
}
