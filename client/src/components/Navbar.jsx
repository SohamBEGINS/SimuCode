import { Link } from 'react-router-dom';
import { SignedIn , SignedOut , RedirectToSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-extrabold tracking-tight text-white font-sans">
          SimuCode
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="uppercase text-lg font-semibold text-white hover:text-cyan-400 transition">
            Home
          </Link>
          <Link to="/features" className="uppercase text-lg font-semibold text-white visited:text-white/90 hover:text-cyan-400 transition no-underline">
            Features
          </Link>
          
          <Link
            to="/login"
            className="ml-4 px-6 py-2 rounded-full border border-cyan-300 text-cyan-300 font-semibold text-lg bg-transparent hover:bg-cyan-300 hover:text-black transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
          onClick={()=>navigate("/login")}>
            Login
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
