import { NextResponse } from 'next/server';
import AdProviderPost from '@models/adProviderPost';
import { connectTodb } from '@utils/database';

export async function POST(req) {
    await connectTodb();

    try {
        const { creator, postContent, posthash } = await req.json();

        if (!creator || !postContent || !posthash) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newPost = new AdProviderPost({
            creator,
            postContent,
            posthash,
        });

        await newPost.save();

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ message: 'Error creating post', error: error.message }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ message: 'Method GET Not Allowed' }, { status: 405 });
}

export function PUT() {
    return NextResponse.json({ message: 'Method PUT Not Allowed' }, { status: 405 });
}

export function DELETE() {
    return NextResponse.json({ message: 'Method DELETE Not Allowed' }, { status: 405 });
}
