import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../../pages/Home/Home';
import Projects from '../../pages/Project/Projects';
import Contact from '../../pages/Contact/Contact';
import Layout from '../Layout/Layout';
import NotFound from '../../pages/NotFound/NotFound';
// TODO: Add a 404 Page
// TODO: Add languages
// TODO: Add a light theme
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
