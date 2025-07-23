import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignInPage from './Pages/SignInPage';
import Dashboard from './Pages/Dashboard';


function AppRoutes() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login/*' element={<SignInPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
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

