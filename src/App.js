import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sponsors from './components/pages/Sponsors';
import Achievements from './components/pages/Achievements';
import Team from './components/pages/Team';
import Contact from './components/pages/Contact';
import Footer from './components/Footer';
import Research from './components/pages/Research';

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 3000);

  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path = '/' exact component = {Home} />
          <Route path = '/research' component = {Research} />
          <Route path = '/sponsors' component = {Sponsors} />
          <Route path = '/achievements' component = {Achievements} />
          <Route path = '/team' component = {Team} />
          <Route path = '/contact-us' component = {Contact} />
        </Switch>
        <Footer/>
        </Router>
    </>
  );
}

export default App;