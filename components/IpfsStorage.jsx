'use client'

import React, { useState } from 'react';
import { pinFileToIPFS, pinJSONToIPFS } from '../utils/pinata';
import { useAuth } from '@app/context/AuthContext';
import axios from 'axios';

const IpfsStorage = () => {
    const { userId } = useAuth();
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [hash, setHash] = useState('');
    const [filename, setFilename] = useState('');
    const [fileType, setFileType] = useState('');

    console.log('userId:', userId);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFilename(selectedFile.name);
        setFileType(selectedFile.type.includes('video') ? 'video' : 'image');
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleUpload = async () => {
        try {
            let response;

            // Upload file to IPFS
            if (file) {
                response = await pinFileToIPFS(file);
                console.log('File upload response:', response);
                setFilename(file.name);
            }

            // Upload text to IPFS
            if (text) {
                response = await pinJSONToIPFS({ text });
                console.log('JSON upload response:', response);
            }

            const ipfsHash = response.IpfsHash;
            setHash(ipfsHash);

            const postData = {
                creator: userId,
                postContent: text || filename,
                posthash: ipfsHash,
                fileType: fileType
            };

            if (!postData.creator || !postData.postContent || !postData.posthash) {
                console.error('Missing required fields:', postData);
                return;
            }

            await axios.post('/api/post/ipfs', postData);

        } catch (error) {
            console.error('Error uploading to IPFS:', error);
        }
    };

    return (
        <div>
            <h1>Upload to IPFS</h1>
            <input type="file" onChange={handleFileChange} />
            <textarea value={text} onChange={handleTextChange} placeholder="Enter text here"></textarea>
            <button onClick={handleUpload}>Upload</button>
            {hash && (
                <div>
                    <h3>Uploaded to IPFS</h3>
                    <p>Hash: {hash}</p>
                    {filename && <p>Filename: {filename}</p>}
                </div>
            )}
        </div>
    );
};

export default IpfsStorage;
