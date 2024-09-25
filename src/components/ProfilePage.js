import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // הוספת import ל-useNavigate

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // State for the uploaded image file
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate(); // יצירת משתנה navigate

  useEffect(() => {
    const token = localStorage.getItem('token'); // קבלת ה-Token

    // Fetch user data
    axios.get('http://localhost:5000/api/auth/user', {
      headers: {
        Authorization: `Bearer ${token}` // הוספת ה-Token לבקשה
      }
    })
    .then(response => {
      setUser(response.data); // שמירת נתוני המשתמש
      // Fetch user's posts using the user's ID
      return axios.get(`http://localhost:5000/api/auth/user/${response.data.id}/posts`, {
        headers: {
          Authorization: `Bearer ${token}` // הוספת ה-Token לבקשה
        }
      });
    })
    .then(response => setPosts(response.data)) // שמירת הפוסטים במצב
    .catch(err => console.error(err));
  }, []); // ריצה פעם אחת עם טעינת הרכיב

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

    axios.post('http://localhost:5000/api/user/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Profile picture uploaded successfully:', response.data);
      setUser(prevUser => ({ ...prevUser, profilePicture: response.data.profilePicture }));
      setUploadError(null);
    })
    .catch(err => {
      console.error(err);
      setUploadError('Failed to upload profile picture.');
    });
  };

  // Handle navigation back to HomePage
  const handleBackToHome = () => {
    navigate('/home'); // כאן ננווט לעמוד הבית
  };

  return (
    <div className="profile-page">
      <h1>{user.username}'s Profile</h1>
      <img src={user.profilePicture} alt={`${user.username}'s profile`} />
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
