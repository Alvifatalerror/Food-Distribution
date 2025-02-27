import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';

import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Auth2 from './components/Auth2';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page with all components */}
        <Route 
          path="/" 
          element={
            <>
              <Header  />
              <About />
              <Projects  />
              <Contact />
              <Footer />
            </>
          } 
        />
        {/* Auth Page (Login/Signup) - Only this component is shown */}
        <Route path='/auth2' element={<Auth2/>}/>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
