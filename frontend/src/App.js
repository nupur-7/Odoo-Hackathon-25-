
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionDetail from './components/QuestionDetail';
import QuestionsPage from './components/QuestionsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestionsPage />} />
          <Route path="/question/:id" element={<QuestionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
