import Post from "@models/post";
import { connectTodb } from "@utils/database";


export const GET = async (req,{params}) =>{ 
    try {
        await connectTodb();
        const posts = await Post.find({
            creator : params.id
        }).populate('creator');
        return new Response(JSON.stringify(posts),{status : 200})
    } catch (error) {
        return new Response ('Failed to fetch all posts',{
            status : 500
        })
    }
}