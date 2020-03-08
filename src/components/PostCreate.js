import React from "react";
import { useForm } from "react-hook-form";

function PostCreate(props) {
  const { register, handleSubmit } = useForm();
  const {
    categories,
    title,
    overview,
    thumbnail,
    category,
    content,
    handleChange,
    onSubmit
  } = props;

  return (
    <React.Fragment>
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="title"
          value={title}
          placeholder="Title"
          onChange={handleChange}
          ref={register({ required: true, maxLength: 30 })}
        />
        <br />
        <textarea
          name="overview"
          value={overview}
          placeholder="Overview"
          onChange={handleChange}
          ref={register({ required: true })}
        />
        <br />
        <input
          name="thumbnail"
          value={thumbnail}
          type="file"
          onChange={handleChange}
          ref={register({ required: true })}
        />
        <br />
        <select
          name="category"
          value={category}
          onChange={handleChange}
          placeholder="Categories"
          ref={register({ required: true })}
        >
          {categories.map(c => (
            <option value={c.title} key={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <br />
        <textarea
          name="content"
          value={content}
          placeholder="Content"
          onChange={handleChange}
          ref={register({ required: true })}
        />
        <br />
        <button type="submit">Create Post</button>
      </form>
    </React.Fragment>
  );
}

export default PostCreate;
