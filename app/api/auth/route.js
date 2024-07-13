// import { connectTodb } from '@utils/database';
// import { NextResponse } from 'next/server';
// import AdProviders from '@models/adprovider';
// import jwt from 'jsonwebtoken';

// export async function POST(req) {
//     await connectTodb();

//     try {
//         const { email, username } = await req.json();

//         // Check if user exists
//         let user = await AdProviders.findOne({ email });
//         if (!user) {
//             // Create a new user
//             user = new AdProviders({ email, username });
//             await user.save();
//         } else {
//             // Check if username matches
//             if (user.username !== username) {
//                 return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//             }
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { userId: user._id, email: user.email },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         return NextResponse.json({ token }, { status: 200 });
//     } catch (error) {
//         console.error('Error in POST /api/auth:', error.message);
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
// }

// export function GET() {
//     return NextResponse.json({ message: 'Method GET Not Allowed' }, { status: 405 });
// }

// export function PUT() {
//     return NextResponse.json({ message: 'Method PUT Not Allowed' }, { status: 405 });
// }

// export function DELETE() {
//     return NextResponse.json({ message: 'Method DELETE Not Allowed' }, { status: 405 });
// }











import { connectTodb } from '@utils/database';
import { NextResponse } from 'next/server';
import AdProviders from '@models/adprovider';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    await connectTodb();

    try {
        const { email, username } = await req.json();

        let user = await AdProviders.findOne({ email });
        if (!user) {
            user = new AdProviders({ email, username });
            await user.save();
        } else {
            if (user.username !== username) {
                return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
            }
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({ token, userId: user._id }, { status: 200 });
    } catch (error) {
        console.error('Error in POST /api/auth:', error.message);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
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

