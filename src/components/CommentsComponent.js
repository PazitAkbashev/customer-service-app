import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsComponent = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); // למעקב אחר תגובה חדשה שנרשמת
  const [error, setError] = useState(null); // מצב לשמירת שגיאות

  useEffect(() => {
    // טעינת כל התגובות מהשרת
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/comments`, {
          headers: {
            Authorization: `Bearer ${token}` // הוספת טוקן לאוטוריזציה
          }
        });
        setComments(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch comments.');
      }
    };

    fetchComments();
  }, []);

  // שליחת תגובה חדשה לשרת
  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('Comment cannot be empty.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:5000/api/comments`, {
        body: newComment, // שליחת התוכן של התגובה החדשה
        // שימו לב שאין צורך לשלוח postId
      }, {
        headers: {
          Authorization: `Bearer ${token}` // הוספת טוקן לאוטוריזציה
        }
      });

      // הוספת התגובה החדשה לרשימה הקיימת
      setComments(prevComments => [...prevComments, response.data]);
      setNewComment(''); // ניקוי שדה התגובה
    } catch (err) {
      console.error(err);
      setError('Failed to add comment.');
    }
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
