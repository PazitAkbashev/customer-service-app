import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import PostCreation from './components/PostCreation.js/index.js';
import ProfilePage from './components/ProfilePage.js/index.js';
import CompanyProfile from './components/CompanyProfile.js/index.js';
import MessageBox from './components/MessageBox.js/index.js';
import NotificationCenter from './components/NotificationCenter.js/index.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/create-post" component={PostCreation} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/company/:id" component={CompanyProfile} />
          <Route path="/messages" component={MessageBox} />
          <Route path="/notifications" component={NotificationCenter} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
