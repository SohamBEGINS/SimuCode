import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white flex justify-between items-center px-6 py-4 shadow-md">
      <div className="text-xl font-bold">SimuCode</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <Link to="/features" className="hover:text-blue-400">Features</Link>
        <button className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700">Login / Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
