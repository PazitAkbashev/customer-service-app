import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CompanyProfile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch company data and its related posts
    axios.get(`/api/companies/${id}`)
      .then(response => {
        setCompany(response.data);
        return axios.get(`/api/companies/${id}/posts`);
      })
      .then(response => setPosts(response.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="company-profile">
      <h1>{company.name} Profile</h1>
      <img src={company.logo} alt={`${company.name} logo`} />
      <h2>Related Posts:</h2>
      <div className="post-list">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="post-actions">
              <button>Likes: {post.likes}</button>
              <button>Dislikes: {post.dislikes}</button>
              <p>Company Response: {post.companyResponse ? post.companyResponse : "No response yet"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProfile;
