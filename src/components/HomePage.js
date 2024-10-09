import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import CommentsComponent from './CommentsComponent'; // יבוא רכיב התגובות
import '../style/homeStyle.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const username = JSON.parse(localStorage.getItem('user')).username;
  const [showComments, setShowComments] = useState({});
  const navigate = useNavigate();
  
  const isGuest = localStorage.getItem('guest') === 'true'; 

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('You are not logged in.');
      return;
    }
  
    axios.get('http://localhost:5000/api/posts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch posts.');
      });
  }, []);
  

  const toggleComments = (postId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('guest');
    navigate('/login');
  };
  

  // פונקציה לעדכון ה-Like
  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // עדכון המידע של הפוסט בהתאם לתגובה מהשרת
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: response.data.likes } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // פונקציה לעדכון ה-Dislike
  const handleDislike = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/dislike`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // עדכון המידע של הפוסט בהתאם לתגובה מהשרת
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, dislikes: response.data.dislikes } : post
        )
      );
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  return (
    <div className="home-page">
      <h1>Latest Posts</h1>
      {error && <p className="error">{error}</p>}
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <div className="post-actions">
                <button onClick={() => handleLike(post.id)}>
                  <FaThumbsUp /> {post.likes}
                </button>
                <button onClick={() => handleDislike(post.id)}>
                  <FaThumbsDown /> {post.dislikes}
                </button>
                <button onClick={() => toggleComments(post.id)}>
                  Comments {Array.isArray(post.comments) ? `(${post.comments.length})` : '(0)'}
                </button>
              </div>
              {showComments[post.id] && (
                <CommentsComponent postId={post.id} />
              )}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      {!isGuest && (
        <>
           <Link to={`/home/${username}/posts/new`} className="create-post-btn">Create New Post</Link>
           <Link to={`/home/${username}/profile`} className="profile-btn">Go to Profile</Link>        
        </>
      )}
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default HomePage;
