import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import HomePage from './components/HomePage.js';
import PostCreation from './components/PostCreation.js';
import ProfilePage from './components/ProfilePage.js';
import LoginPage from './components/LoginPage.js';
import RegisterPage from './components/RegisterPage.js'; // ייבוא עמוד Register

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* הפניה אוטומטית ל-login אם הגעת ל-root */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* עמוד ה-Register */}
          <Route path="/home/:username" element={<HomePage />} /> {/* עמוד הבית עם username */}
          <Route path="/home/:username/create-post" element={<PostCreation />} />
          <Route path="/home/:username/profile" element={<ProfilePage />} />
    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
