import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../../pages/Home/Home';
import Layout from '../Layout/Layout';
import NotFound from '../../pages/NotFound/NotFound';
import ImageEditor from '../../pages/ImageEditor/ImageEditor';
import Mhqc from '../../pages/Mhqc/Arca';
import RecommenderSystem from '../../pages/RecommenderSystem/RecommenderSystem';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/image-editor" element={<ImageEditor />} />
          <Route path="/arca" element={<Mhqc />} />
          <Route path="/recommender-system" element={<RecommenderSystem />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
