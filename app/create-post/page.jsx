'use client'

import Form from '@components/Form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const CreatePosts = () => {

  const {data : session} = useSession();

  
  const [post , setPost] = useState(
    {
      post : '',
      link : '',
      image : null,
      tag : '',
    }
)

  const handleImage = (e) => {
    setPost
    (
      {
      ...post,
      image : e.target.files[0],
    }
    );
  }

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  const Create = async(e)=>{

      e.preventDefault();

      const userId = session?.user.id;
      console.log(userId,'this is the user id');

      const formData = new FormData();
      formData.append('file', post.image);
      formData.append('postContent', post.post);
      formData.append('linkText', post.link);
      formData.append('tagContent', post.tag);  

  
        try {
          const response = await axios.post(`/api/post/${userId}/new-post`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.status === 200) {
            console.log('Post created successfully:', response.data);
          }
        } catch (error) {
          console.error('Error creating post:', error);
        }
  }
  return (
    <Form
      post={post}
      handleChange={handleChange}
      handleImage={handleImage}
      handleSubmit={Create}
    />
  )
}

export default CreatePosts