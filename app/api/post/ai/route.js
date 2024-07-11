import Post from '@models/post';
import { connectTodb } from '@utils/database';

export const GET = async (request) => {
  try {
    await connectTodb();
    const filterPost = await Post.find({ tag: 'AI' });
    return new Response(JSON.stringify(filterPost), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response('Failed to fetch posts', {
      status: 500,
    });
  }
};
