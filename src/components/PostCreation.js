import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PostCreation = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('recommend');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, body, category };

    axios.post('/api/posts', postData)
      .then(() => {
        history.push('/');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="post-creation">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Body:
          <textarea value={body} onChange={e => setBody(e.target.value)} />
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
