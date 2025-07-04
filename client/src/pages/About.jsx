import React from 'react';

function About() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About MERN Blog</h1>
      <p className="text-gray-700 mb-2">
        This is a full-stack MERN blog application built with MongoDB, Express.js, React, and Node.js.
      </p>
      <p className="text-gray-700">
        It supports post creation, category management, and more. Stay tuned as we continue to add new features like image uploads, comments, and authentication!
      </p>
    </div>
  );
}

export default About;
