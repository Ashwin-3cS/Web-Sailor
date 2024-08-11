// this is like where to just you know to fetch data
// 'use client'

// import axios from 'axios';
// import { useSession, signIn } from 'next-auth/react';
// import React, { useState } from 'react';

// const Adspace = () => {
//   const [ipfsData, setIpfsData] = useState(null);
//   const { data: session } = useSession();
//   const [data, setData] = useState({
//     video: '',
//     content: '',
//   });

//   const handleViewClick = async () => {
//     if (!session) {
//       signIn();
//     } else {
//       const ipfsHashes = await fetchIPFSData();
//       setData({
//         video: ipfsHashes.video,
//         content: ipfsHashes.content,
//       });
//     }
//   };

//   const fetchIPFSData = async () => {
//     try {
//       console.log('Fetching IPFS data...');
//       const url = `https://api.pinata.cloud/data/pinList?status=pinned`;
//       const response = await axios.get(url, {
//         headers: {
//           'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
//           'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
//         },
//       });

//       console.log('Pinata response:', response.data);

//       const ipfsHashes = {
//         video: response.data.rows[2].ipfs_pin_hash,
//         content: response.data.rows[1].ipfs_pin_hash,
//       };

//       return ipfsHashes;
//     } catch (error) {
//       console.error('Error fetching IPFS data:', error);
//       return null;
//     }
//   };

//   console.log('IPFS DATA', ipfsData);

//   return (
//     <div>
//       <button onClick={handleViewClick} className='btn btn-primary'>View</button>
//       {data.video ? (
//         <div className="card bg-base-100 w-96 shadow-xl mt-4">
//           <figure className="px-10 pt-10">
//             <video controls className="rounded-xl">
//               <source src={`https://bronze-changing-aphid-363.mypinata.cloud/ipfs/${data.video}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_KEY}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </figure>
//           <div className="card-body items-center text-center">
//             <h2 className="card-title">Video Content</h2>
//             <p>{data.content}</p>
//           </div>
//         </div>
//       ) : (
//         <p>No data available.</p>
//       )}
//     </div>
//   );
// };

// export default Adspace;





// 'use client'

// import axios from 'axios';
// import { useSession, signIn } from 'next-auth/react';
// import React, { useState, useEffect, useRef } from 'react';

// const Adspace = () => {
//   const [ipfsData, setIpfsData] = useState(null);
//   const { data: session } = useSession();
//   const [data, setData] = useState({
//     video: '',
//     content: '',
//   });
//   const adspaceRef = useRef(null);
//   const videoRef = useRef(null);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);

//   const handleViewClick = async () => {
//     if (!session) {
//       signIn();
//     } else {
//       const ipfsHashes = await fetchIPFSData();
//       setData({
//         video: ipfsHashes.video,
//         content: ipfsHashes.content,
//       });
//       setIpfsData(ipfsHashes);
//     }
//   };

//   const fetchIPFSData = async () => {
//     try {
//       console.log('Fetching IPFS data...');
//       const url = `https://api.pinata.cloud/data/pinList?status=pinned`;
//       const response = await axios.get(url, {
//         headers: {
//           'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
//           'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
//         },
//       });

//       console.log('Pinata response:', response.data);

//       const ipfsHashes = {
//         video: response.data.rows[2].ipfs_pin_hash,
//         content: response.data.rows[1].ipfs_pin_hash,
//       };

//       return ipfsHashes;
//     } catch (error) {
//       console.error('Error fetching IPFS data:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             console.log('Video entered view at:', Date.now());
//             setStartTime(Date.now());
//           } else {
//             console.log('Video exited view at:', Date.now());
//             setEndTime(Date.now());
//             if (videoRef.current) {
//               videoRef.current.pause();
//             }
//             recordViewTime();
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     if (adspaceRef.current) {
//       observer.observe(adspaceRef.current);
//     }

//     return () => {
//       if (adspaceRef.current) {
//         observer.unobserve(adspaceRef.current);
//       }
//     };
//   }, [startTime]);

//   const recordViewTime = async () => {
//     if (startTime && endTime) {
//       const viewDuration = endTime - startTime;
//       console.log('Start time:', new Date(startTime).toISOString());
//       console.log('End time:', new Date(endTime).toISOString());
//       console.log('View duration (ms):', viewDuration);

//       try {
//         const response = await fetch('/api/uploadTime', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             userId: session.user.id,
//             totalViewTime: viewDuration,
//           }),
//         });

//         if (response.ok) {
//           console.log('View time recorded successfully:', await response.json());
//         } else {
//           throw new Error('Failed to record view time');
//         }
//       } catch (error) {
//         console.error('Error recording view time:', error);
//       }

//       setStartTime(null);
//       setEndTime(null);
//     }
//   };

//   return (
//     <div ref={adspaceRef}>
//       <button onClick={handleViewClick} className='btn btn-primary'>View</button>
//       {data.video ? (
//         <div className="card bg-base-100 w-96 shadow-xl mt-4">
//           <figure className="px-10 pt-10">
//             <video ref={videoRef} controls className="rounded-xl">
//               <source src={`https://bronze-changing-aphid-363.mypinata.cloud/ipfs/${data.video}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_KEY}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </figure>
//           <div className="card-body items-center text-center">
//             <h2 className="card-title">Video Content</h2>
//             {/* <p>{data.content}</p> */}
//           </div>
//         </div>
//       ) : (
//         <p>No data available.</p>
//       )}
//     </div>
//   );
// };

// export default Adspace;




'use client';

import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router'; // Import Router from next/router
import Verify from './Verify';

const Adspace = () => {
  const [ipfsData, setIpfsData] = useState(null);
  const { data: session } = useSession();
  const [data, setData] = useState({
    video: '',
    content: '',
  });
  const adspaceRef = useRef(null);
  const videoRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const handleViewClick = async () => {
    if (!session) {
      signIn();
    } else {
      const ipfsHashes = await fetchIPFSData();
      setData({
        video: ipfsHashes.video,
        content: ipfsHashes.content,
      });
      setIpfsData(ipfsHashes);
      setIsTracking(true);
    }
  };

  const fetchIPFSData = async () => {
    try {
      console.log('Fetching IPFS data...');
      const url = `https://api.pinata.cloud/data/pinList?status=pinned`;
      const response = await axios.get(url, {
        headers: {
          'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        },
      });

      console.log('Pinata response:', response.data);

      const ipfsHashes = {
        video: response.data.rows[3].ipfs_pin_hash,
        content: response.data.rows[1].ipfs_pin_hash,
      };

      return ipfsHashes;
    } catch (error) {
      console.error('Error fetching IPFS data:', error);
      return null;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (isTracking) {
            if (entry.isIntersecting) {
              console.log('Video entered view at:', Date.now());
              setStartTime(Date.now());
              if (videoRef.current) {
                videoRef.current.play();
              }
            } else {
              console.log('Video exited view at:', Date.now());
              if (videoRef.current) {
                videoRef.current.pause();
              }
              setEndTime(Date.now());
              recordViewTime();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (adspaceRef.current) {
      observer.observe(adspaceRef.current);
    }

    return () => {
      if (adspaceRef.current) {
        observer.unobserve(adspaceRef.current);
      }
    };
  }, [isTracking]);

  useEffect(() => {
    // Listen for route changes
    const handleRouteChange = () => {
      console.log('Route change detected');
      if (startTime && isTracking) {
        console.log('Recording view time');
        setEndTime(Date.now());
        recordViewTime();
      }
    };

    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [startTime, isTracking]);

  const recordViewTime = async () => {
    if (startTime && endTime) {
      const viewDuration = endTime - startTime;
      console.log('Start time:', new Date(startTime).toISOString());
      console.log('End time:', new Date(endTime).toISOString());
      console.log('View duration (ms):', viewDuration);

      const payload = {
        userId: session.user.id,
        totalViewTime: viewDuration,
      };

      console.log('Sending payload:', payload);

      try {
        const response = await fetch('/api/uploadTime', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('View time recorded successfully:', responseData);
        } else {
          const errorData = await response.json();
          console.error('Failed to record view time:', errorData);
        }
      } catch (error) {
        console.error('Error recording view time:', error);
      }

      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleVerifyClick = () => {
    console.log('Verify button clicked');
  };

  return (
    <div ref={adspaceRef}>
      <button onClick={handleViewClick} className='btn btn-primary'>View</button>
      {data.video ? (
        <div className="card bg-base-100 w-96 shadow-xl mt-4">
          <figure className="px-10 pt-10">
            <video ref={videoRef} controls className="rounded-xl">
              <source src={`https://bronze-changing-aphid-363.mypinata.cloud/ipfs/${data.video}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_KEY}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Video Content</h2>
            {/* <p>{data.content}</p> */}
          </div>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Adspace;











