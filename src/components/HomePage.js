import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import '../style/homeStyle.css'

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the server (dummy endpoint for now)
    axios.get('/api/posts')
      .then(response => setPosts(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-page">
      <h1>Latest Posts</h1>
      <div className="post-list">
        {posts.map(post => (
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
              <Link to={`/post/${post.id}`}>Comments ({post.comments.length})</Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/create-post" className="create-post-btn">Create New Post</Link>
    </div>
  );
};

export default HomePage;
