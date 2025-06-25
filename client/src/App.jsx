import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './Pages/Home';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import Dashboard from './Pages/Dashboard';
import BeamBackground from './components/BeamBackground';

// Helper to conditionally render Footer
function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <BeamBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<SignInPage/>} />
        <Route path = '/sign-up' element={<SignUpPage/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {location.pathname === "/" && <Footer />}
    </>
  );
}

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;

