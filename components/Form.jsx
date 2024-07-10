
import React from 'react'

const Form = ({ post, handleChange, handleImage, handleSubmit }) => {
  return (
    <section>
      <form onSubmit={handleSubmit}>
      <span>Your Opinion about the post</span>
        <textarea
          name="post"
          value={post.post}
          onChange={handleChange}
          placeholder="Your Content"
        />

        <input
          type="text"
          name="link"
          value={post.link}
          onChange={handleChange}
          placeholder="Link of the website"
        />

        <input
          type="file"
          name="image"
          onChange={handleImage}
          placeholder="Your File here"
        />

        <input
          type="text"
          name="tag"
          value={post.tag}
          onChange={handleChange}
          placeholder="Tag"
        />

        <button type="submit">Create Post</button>
      </form>
    </section>
  )
}

export default Form;