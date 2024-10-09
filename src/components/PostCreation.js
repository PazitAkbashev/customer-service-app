import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/PostCreation.css';

const PostCreation = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('recommend');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, body, category };

    const token = localStorage.getItem('token');

    axios.post('http://localhost:5000/api/posts', postData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      navigate(`/home/${user.username}`);
    })
    .catch(err => {
      console.error(err);
      setError('Failed to create post.');
    });
  };

  // Handle navigation back to home page
  const handleBackToHome = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    navigate(`/home/${user.username}`);
  };

  return (
    <div className="post-creation">
      <h1>Create a New Post</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Body:
          <textarea value={body} onChange={e => setBody(e.target.value)} required />
        </label>
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="recommend">Recommend</option>
            <option value="complain">Complain</option>
          </select>
        </label>
        <div className="action-buttons">
          <button type="submit">Submit Post</button>
          <button type="button" onClick={handleBackToHome} className="back-button">Back to Home</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreation;
