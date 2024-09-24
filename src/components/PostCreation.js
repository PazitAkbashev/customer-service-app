import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostCreation = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('recommend');
  const [error, setError] = useState(null); // מצב לשגיאות
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, body, category };
    
    const token = localStorage.getItem('token'); // קבלת ה-Token

    // שליחת הבקשה ליצירת פוסט
    axios.post('http://localhost:5000/api/posts', postData, {
      headers: {
        Authorization: `Bearer ${token}` // הוספת ה-Token לבקשה
      }
    })
    .then(() => {
       navigate('/home'); // לשנות לנתיב לדף הבית לאחר יצירת הפוסט
    })
    .catch(err => {
      console.error(err);
      setError('Failed to create post.'); // עדכון מצב השגיאה
    });
  };

  return (
    <div className="post-creation">
      <h1>Create a New Post</h1>
      {error && <p className="error">{error}</p>} {/* הצגת הודעת שגיאה אם יש */}
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
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default PostCreation;
