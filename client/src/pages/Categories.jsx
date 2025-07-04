import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Categories</h1>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat._id} className="bg-gray-100 px-4 py-2 rounded shadow">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
