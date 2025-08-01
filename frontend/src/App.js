import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LeadList from './components/LeadList';
import LeadForm from './components/LeadForm';
import OpportunityList from './components/OpportunityList';
import OpportunityForm from './components/OpportunityForm';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Services
import AuthService from './services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/leads" element={
              <PrivateRoute>
                <LeadList />
              </PrivateRoute>
            } />
            <Route path="/leads/add" element={
              <PrivateRoute>
                <LeadForm />
              </PrivateRoute>
            } />
            <Route path="/leads/edit/:id" element={
              <PrivateRoute>
                <LeadForm />
              </PrivateRoute>
            } />
            <Route path="/opportunities" element={
              <PrivateRoute>
                <OpportunityList />
              </PrivateRoute>
            } />
            <Route path="/opportunities/add" element={
              <PrivateRoute>
                <OpportunityForm />
              </PrivateRoute>
            } />
            <Route path="/opportunities/edit/:id" element={
              <PrivateRoute>
                <OpportunityForm />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;