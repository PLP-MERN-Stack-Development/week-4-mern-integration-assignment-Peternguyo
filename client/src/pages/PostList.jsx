import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Latest Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="bg-white rounded shadow p-4">
          {post.image && (
            <img
              src={`/uploads/${post.image}`}
              alt="Post"
              className="w-full h-48 object-cover rounded mb-2"
            />
          )}
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700 truncate">{post.content}</p>
          <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PostList;
