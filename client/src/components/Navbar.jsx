import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="top-0 left-0 w-full z-50 bg-gradient-to-r from-black/90 via-gray-900/80 to-black/90 backdrop-blur border-b border-cyan-400/20 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo with code accent */}
        <div className="text-2xl font-extrabold tracking-tight text-cyan-300 font-mono flex items-center select-none">
          <span className="mr-2 text-cyan-400">&#60;/&#62;</span>SimuCode
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-6 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400 text-cyan-200 font-mono font-semibold text-base shadow hover:bg-cyan-400 hover:text-black transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 backdrop-blur"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
