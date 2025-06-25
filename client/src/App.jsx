import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './Pages/Home';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import Dashboard from './Pages/Dashboard';
import BeamBackground from './components/BeamBackground';

const App = () => {
  return (
    <Router>
      <BeamBackground />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<SignInPage/>} />
        <Route path = '/sign-up' element={<SignUpPage/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

