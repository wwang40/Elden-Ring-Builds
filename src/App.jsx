import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BuildsList from './pages/BuildsList';
import CreateBuild from './pages/CreateBuild';
import EditBuild from './pages/EditBuild';
import BuildDetails from './pages/BuildDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<BuildsList />} />
            <Route path="/create" element={<CreateBuild />} />
            <Route path="/edit/:id" element={<EditBuild />} />
            <Route path="/build/:id" element={<BuildDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;