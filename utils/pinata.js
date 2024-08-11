import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

const pinFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', file);

    const response = await axios.post(url, data, {
        headers: {
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_API_KEY,
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

const pinJSONToIPFS = async (json) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const response = await axios.post(url, json, {
        headers: {
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_API_KEY,
            'Content-Type': 'application/json'
        }
    });

    return response.data;
};

export { pinFileToIPFS, pinJSONToIPFS };
