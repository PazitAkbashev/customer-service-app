import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsComponent = (props) => {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState(''); // לשמור את גוף התגובה החדשה
  const [error, setError] = useState(null); // מצב לשמירת שגיאות
  const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {
    // טעינת כל התגובות מהשרת
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/comments?postId=${postId}`, {
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
  }, [postId]); // הוספת postId כתלות

  // שליחת תגובה חדשה לשרת
  const handleAddComment = async (e) => {
    e.preventDefault(); // מניעת רענון הדף
    if (body.trim() === '') {
      alert('Comment cannot be empty.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api/comments`, {
        body,
        userId : user.id,
        postId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // הנחה שהטוקן שמור ב-localStorage
        }
      });

      const createdComment = response.data; // קבלת התגובה שנוצרה
      console.log('Comment created:', createdComment);

      // הוספת התגובה החדשה לרשימה הקיימת
      setComments(prevComments => [...prevComments, createdComment]);
      setBody(''); // ניקוי שדה התגובה
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
      {user.username !== 'guest' ? (
      <div className="add-comment">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Add new comment</button>
      </div> 
      ): ( 
        <p>guest cant add comments</p> // הודעה אם אין תגובות

      ) }
    </div>
  );
};

export default CommentsComponent;
