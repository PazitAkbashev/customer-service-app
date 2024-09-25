import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import '../style/homeStyle.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); // הוספת מצב לשגיאות
  const navigate = useNavigate();
  
  // בדיקת סוג המשתמש
  const isGuest = localStorage.getItem('guest') === 'true'; // הנח שיש לך מפתח 'guest' ב-localStorage

  useEffect(() => {
    const token = localStorage.getItem('token'); // קבלת ה-Token

    // Fetch posts from the server
    axios.get('http://localhost:5000/api/posts', {
      headers: {
        Authorization: `Bearer ${token}` // הוספת ה-Token לבקשה
      }
    })
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch posts.'); // שמירה על שגיאה במצב
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('guest');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType'); // הסרת סוג המשתמש
    navigate('/login');
  };

  return (
    <div className="home-page">
      <h1>Latest Posts</h1>
      {error && <p className="error">{error}</p>} {/* הצגת הודעת שגיאה אם יש */}
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <div className="post-actions">
                <button>
                  <FaThumbsUp /> {post.likes}
                </button>
                <button>
                  <FaThumbsDown /> {post.dislikes}
                </button>
                <Link to={`/post/${post.id}`}>Comments {Array.isArray(post.comments) ? `(${post.comments.length})` : '(0)'}</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p> // הודעה אם אין פוסטים
        )}
      </div>

      {/* בדיקה אם המשתמש הוא לא guest */}
      {!isGuest && (
        <>
          <Link to="/create-post" className="create-post-btn">Create New Post</Link>
          <Link to="/profile" className="profile-btn">Go to Profile</Link> {/* כפתור לעבור לעמוד הפרופיל */}
        </>
      )}
      
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default HomePage;
