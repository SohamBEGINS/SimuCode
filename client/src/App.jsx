import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future pages here */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

//explain how the home page is incorporated into the application
// The Home page is incorporated into the application through the `Routes` component from `react-router-dom`.
// It is defined as a route with the path `/`, which means it will be displayed when the user navigates to the root URL of the application.
// The `Home` component is imported and rendered as the element for this route.

//explain in programming terms how the Home page is structured
// The Home page is structured as a functional component in React. It imports two child components, `Hero` and `HowItWorks`, which are responsible for rendering specific sections of the Home page.
// why its surrounded by curly braces
// The curly braces around the `Home` component in the `Routes` definition indicate that it is a JavaScript expression being passed as a prop.