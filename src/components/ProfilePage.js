import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios.get('/api/user')
      .then(response => {
        setUser(response.data);
        return axios.get(`/api/user/${response.data.id}/posts`);
      })
      .then(response => setPosts(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="profile-page">
      <h1>{user.username}'s Profile</h1>
      <img src={user.profilePicture} alt={`${user.username}'s profile`} />
      <h2>Posts:</h2>
      <div className="post-list">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="post-actions">
              <button>Likes: {post.likes}</button>
              <button>Dislikes: {post.dislikes}</button>
              <Link to={`/post/${post.id}`}>Comments ({post.comments.length})</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
