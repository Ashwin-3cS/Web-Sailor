import Post from '@models/post';

export const GET = async (request) => {
  try {
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
