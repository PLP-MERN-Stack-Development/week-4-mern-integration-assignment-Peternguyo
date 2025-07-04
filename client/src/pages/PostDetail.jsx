import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error('Error fetching post:', err));
  }, [id]);

  if (!post) return <p className="text-center">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.image && (
        <img
          src={`/uploads/${post.image}`}
          alt="Post"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p className="text-gray-700 mb-2">{post.content}</p>
      <p className="text-sm text-gray-500">
        Category: {post.category?.name || 'Uncategorized'}
      </p>
    </div>
  );
}

export default PostDetail;
