'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'


const AiPage = () => {
  const [filteredPost , setFilteredPost] = useState ([]);
  useEffect(() => {
    const fetchthePosts = async()=> { 
      try {
        const response =  await axios.get('http://localhost:3000/api/post/ai');
        setFilteredPost(response.data)
  
      } catch (error) {
        console.log(error)
      }
    }
    fetchthePosts();
  }, []);

  return (
    <div> 
      <ul>
      {filteredPost.map((post)=>{
        return (
        <li key={post._id}>
          {post.post}
        </li>
        );
      })}
      </ul>
 
    </div>
  )
}

export default AiPage;