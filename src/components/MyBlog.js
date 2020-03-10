import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

function MyBlog(props) {
  const {
    posts,
    update,
    setUpdate,
    updatePost,
    updateId,
    handleUpdate,
    handleDelete
  } = props;
  const [hidden, setHidden] = useState(false);

  if (update) {
    setUpdate(!update);
    return (
      <Redirect
        to={{
          pathname: `/blog/${updateId}/update`,
          state: {
            updatePost: updatePost,
            updateId: updateId
          }
        }}
      />
    );
  }

  const handleClick = () => {
    setHidden(!hidden);
  };

  if (posts.length < 1) return <h2>You don't have any posts.</h2>;

  return (
    <React.Fragment>
      <h1>My Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <b>{post.author.user.username}</b>
            <br />
            <b>{post.timestamp.substring(0, 10)}</b>
            <br />
            {post.category.map(c => (
              <div key={c.id}>
                {c.title}
                <br />
              </div>
            ))}
            <div>views : {post.view_count}</div>
            <div>comments : {post.comment_count}</div>
            <button onClick={() => handleUpdate(post, post.id)}>update</button>
            <button onClick={handleClick}>delete</button>
            {hidden && (
              <React.Fragment>
                <button onClick={() => handleDelete(post.id)}>confirm</button>
                <button onClick={handleClick}>cancel</button>
              </React.Fragment>
            )}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default MyBlog;
