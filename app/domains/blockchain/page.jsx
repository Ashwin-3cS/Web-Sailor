'use client'

import Adspace from '@components/Adspace';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Verify from '../../../components/Verify';

const BlockchainPage = () => {
  const [filteredPost, setFilteredPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/post/blockchain');
        setFilteredPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='flex flex-col items-center  h-screen  mt-10'>
      <h1 className='text-2xl font-bold mb-6'>Blockchain</h1>
      <div className='flex justify-center w-full'>
        <ul className='w-1/2 border-r-2 border-gray-300 pr-4'>
          {filteredPost.map((post) => (
            <li key={post._id} className='mb-4'>
              <div className="card bg-base-100 w-[65%]  shadow-xl mb-4">
                <figure className="px-10 pt-10">
                  <img
                    src={post.image}
                    alt="user-post"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{post.post}</h2>
                  <p>{post.link}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary">Read More</button>
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 w-[65%]  shadow-xl mb-4">
                <figure className="px-10 pt-10">
                  <img
                    src={post.image}
                    alt="user-post"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{post.post}</h2>
                  <p>{post.link}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary">Read More</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className='w-[10%] pl-4'>
          <Adspace/>
        </div>
        <Verify/>

      </div>
    </div>
  );
}

export default BlockchainPage;
