'use client'

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          } else {
            console.error("Failed to fetch posts");
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [session?.user?.id]);

  console.log(posts);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index}>
            <h3>{post.post}</h3>
            <img src={post.image} alt="" />
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default MyProfile;
