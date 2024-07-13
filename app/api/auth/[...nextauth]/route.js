import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectTodb } from '@utils/database';

import User from '@models/user';



const handler = NextAuth ({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks : {
        async signIn ( {profile}) {
            try {
                await connectTodb() ;                
                const userExists =await User.findOne (
                    {
                        email : profile.email
                    }
                );

                if (!userExists) {
                    await User.create (
                        {
                            email : profile.email,
                            username : profile.name.replace(" ", "").toLowerCase(),
                            image : profile.picture
                        }
                    )
                } 

                return  true;
            } catch (error) {
                console.log(error);
                return false
            }
        },

        async session ({session}){ // authenticated user details

            const sessionUser = await User.findOne({
                email : session.user.email
            })
            session.user.id = sessionUser._id.toString();
            return session 
            

        }
    } 
})


export {handler as GET , handler as POST}




//its forming the collection

// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import { connectTodb } from '@utils/database';
// import User from '@models/user';
// import AdProviders from '@models/adprovider';

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user, account, profile }) {
//             if (account && profile) {
//                 const userType = account.provider === 'google' && profile.email.endsWith('@yourdomain.com') ? 'adProvider' : 'user'; // Adjust logic as per your requirement
//                 token.type = userType;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user.type = token.type;
//             await connectTodb();
//             const collection = session.user.type === 'adProvider' ? AdProviders : User;
//             const sessionUser = await collection.findOne({ email: session.user.email });
//             session.user.id = sessionUser._id.toString();
//             return session;
//         },
//         async signIn({ user, account, profile }) {
//             try {
//                 await connectTodb();
//                 const userType = account.provider === 'google' && profile.email.endsWith('@yourdomain.com') ? 'adProvider' : 'user'; // Adjust logic as per your requirement
//                 const collection = userType === 'adProvider' ? AdProviders : User;

//                 const userExists = await collection.findOne({ email: profile.email });

//                 if (!userExists) {
//                     await collection.create({
//                         email: profile.email,
//                         username: profile.name.replace(" ", "").toLowerCase(),
//                         image: profile.picture
//                     });
//                 }

//                 return true;
//             } catch (error) {
//                 console.log(error);
//                 return false;
//             }
//         },
//     }
// });

// export { handler as GET, handler as POST };








// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import { connectTodb } from '@utils/database';
// import User from '@models/user';
// import AdProviders from '@models/adprovider';

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user, account, profile }) {
//             if (account && user) {
//                 token.userType = account.type || 'user'; // Set userType from account.type
//                 console.log(`JWT Callback: userType set to ${token.userType}`);
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user.type = token.userType || 'user'; // Default to 'user' if not set
//             console.log(`Session Callback: userType is ${session.user.type}`);
//             await connectTodb();
//             const collection = session.user.type === 'adProvider' ? AdProviders : User;
//             const sessionUser = await collection.findOne({ email: session.user.email });
//             session.user.id = sessionUser._id.toString();
//             return session;
//         },
//         async signIn({ user, account, profile, query }) {
//             try {
//                 const userType = query?.type || 'user'; // Access userType from query parameter with fallback to 'user'
//                 console.log(`SignIn Callback: userType is ${userType}`);
//                 await connectTodb();
//                 const collection = userType === 'adProvider' ? AdProviders : User;

//                 const userExists = await collection.findOne({ email: user.email });

//                 if (!userExists) {
//                     await collection.create({
//                         email: user.email,
//                         username: user.name.replace(" ", "").toLowerCase(),
//                         image: user.image,
//                         type: userType // Ensure userType is stored in the database
//                     });
//                     console.log(`New user created in ${userType} collection`);
//                 }

//                 return true;
//             } catch (error) {
//                 console.log(error);
//                 return false;
//             }
//         },
//     }
// });

// export { handler as GET, handler as POST };
