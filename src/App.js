import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import HomePage from './components/HomePage.js';
import PostCreation from './components/PostCreation.js';
import ProfilePage from './components/ProfilePage.js';
import CompanyProfile from './components/CompanyProfile.js';
import MessageBox from './components/MessageBox.js';
import NotificationCenter from './components/NotificationCenter.js';
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
          <Route path="/home" element={<HomePage />} /> {/* עמוד הבית */}
          <Route path="/create-post" element={<PostCreation />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/messages" element={<MessageBox />} />
          <Route path="/notifications" element={<NotificationCenter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
