import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // קבלת המידע מה-localStorage

    if (!user || !user.id) {
      console.error('User not found in localStorage');
      return;
    }

    setUser(user); // שמירת פרטי המשתמש

    // Fetch user's posts using the user's ID
    axios.get(`http://localhost:5000/api/auth/user/${user.id}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setPosts(response.data))
    .catch(err => console.error(err));
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle profile picture upload
  const handleUpload = () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    const token = localStorage.getItem('token'); // קבלת ה-token

    axios.post('http://localhost:5000/api/user/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
      console.log('Profile picture uploaded successfully:', response.data);
      setUploadError(null);
    })
    .catch(err => {
      console.error(err);
      setUploadError('Failed to upload profile picture.');
    });
  };

  // Handle navigation back to HomePage
  const handleBackToHome = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    navigate(`/home/${user.username}`);// כאן ננווט לעמוד הבית
  };

  return (
    <div className="profile-page">
      <h1>{user ? `${user.username}'s Profile` : 'User Profile'}</h1>
      <h2>Upload New Profile Picture:</h2>
      <input type="file" onChange={handleFileChange} />
      {uploadError && <p className="error">{uploadError}</p>}
      <button onClick={handleUpload}>Upload</button>

      <h2>Posts:</h2>
      <div className="post-list">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="post-actions">
              <button>Likes: {post.likes}</button>
              <button>Dislikes: {post.dislikes}</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleBackToHome} className="back-to-home-btn">Back to Home</button>
    </div>
  );
};

export default ProfilePage;
