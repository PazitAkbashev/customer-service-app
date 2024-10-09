import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsComponent = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); // למעקב אחר תגובה חדשה שנרשמת
  const [error, setError] = useState(null); // מצב לשמירת שגיאות
  
  useEffect(() => {
    // טעינת תגובות מהשרת לפי postId
    axios.get(`http://localhost:5000/api/posts/${postId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch comments.');
      });
  }, [postId]);

  // שליחת תגובה חדשה לשרת
  const handleAddComment = () => {
    if (newComment.trim() === '') {
      alert('Comment cannot be empty.');
      return;
    }

    const token = localStorage.getItem('token');
    axios.post(`http://localhost:5000/api/posts/${postId}/comments`, {
      body: newComment, // שליחת התוכן של התגובה החדשה
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setComments([...comments, response.data]); // הוספת התגובה החדשה לרשימה הקיימת
      setNewComment(''); // ניקוי שדה התגובה
    })
    .catch(err => {
      console.error(err);
      setError('Failed to add comment.');
    });
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {error && <p className="error">{error}</p>} {/* הצגת שגיאות אם יש */}
      
      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.body}</p>
              <small>By User {comment.userId} on {new Date(comment.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p> // הודעה אם אין תגובות
      )}

      {/* טופס להוספת תגובה חדשה */}
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
    </div>
  );
};

export default CommentsComponent;
