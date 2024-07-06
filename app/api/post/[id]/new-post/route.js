import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { connectTodb } from '@utils/database';
import Post from '@models/post';
import { v4 as uuidv4 } from 'uuid'; 


dotenv.config();


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

async function uploadFiletoS3(file, fileName) {
    const fileBuffer = file;
    // console.log('File Name:', fileName);
    // console.log('File Buffer:', fileBuffer);
    
    const uniqueFileName = `${uuidv4()}-${fileName}`; // Generate a unique file name


    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `user-image/${uniqueFileName}-${Date.now()}`,
        Body: fileBuffer,
        ContentType: "image/jpg"
    };

    try {
        const command = new PutObjectCommand(params);
        const response = await s3.send(command);
        
        const fileKey = params.Key;
        return {fileName,fileKey};
        
    } catch (error) {
        console.error('S3 Upload Error:', error);
        throw error; 
    }
}

export const POST = async (request,{params}) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        // const userId = formData.get('userId');
        const postContent = formData.get('postContent');
        const linkText = formData.get('linkText');
        const tagContent = formData.get('tagContent');

        const {id : userId} = params;
        console.log(userId);


        if (!file) {
            return NextResponse.json({ error: 'File is missing' }, { status: 400 });
        }

        if (!userId || !postContent || !linkText || !tagContent) {
            return NextResponse.json({ error: 'Some post details are missing' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const {fileName,fileKey} = await uploadFiletoS3(buffer, file.name);  // buffer and file.name are given as input to the uploadFiletoS3 function and taht function returns the two objects filename and filekey then we destructure it 

        const imgUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`; 

        await connectTodb();
        const newPost = new Post({
            creator : userId,
            post : postContent,
            link : linkText,
            image : imgUrl,
            tag : tagContent
        })
        await newPost.save();
        return NextResponse.json({ success: true, newPost }, { status: 200 });

    } catch (error) {
        console.error('Post Creation Error:', error);
        return NextResponse.json({ error: "Failed to create a new Post", details: error.message }, { status: 500 });
    }
};
