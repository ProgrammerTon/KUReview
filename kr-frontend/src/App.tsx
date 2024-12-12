import React, { useState, useEffect } from 'react';
import './App.css';
import { Professor } from './interfaces';
import ProfessorItem from './components/ProfessorItem';
import NewProfessorForm from './components/NewProfessorForm';
import ProfessorService from './services/ProfessorService';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pageone from './pages/pageone';
import AddProfessorPage from './pages/addProfessorPage';

const App = () => {
  const [professor, setProfessor] = useState<Professor[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  const toggleFormVisible = () => {
    setFormVisible(!formVisible);
  };

  const fetchProfessor = () => {
    ProfessorService.fetchProfessor().then((professor) => {
      setProfessor(professor);
    });
  };

  const handleNewProfessorCreated = (professor: Professor) => {
    fetchProfessor();
    setFormVisible(false);
  };

  useEffect(() => {
    fetchProfessor();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Main Navigation */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/pageone">Go to Page One </Link>
          <Link to="/addProfessorPage">Go to addProfessorPage </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <button onClick={toggleFormVisible}>เพิ่มอาจารย์</button>
                {formVisible && <NewProfessorForm onNewProfessorCreated={handleNewProfessorCreated} />}
              </>
            }
          />
          <Route path="/pageone" element={<Pageone />} />
          <Route path="/addProfessorPage" element={<AddProfessorPage />}/>
        </Routes>
      </div>
    </Router>
  );
};



export default App;
