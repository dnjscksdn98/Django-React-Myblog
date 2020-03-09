import React from "react";
import { Link, Redirect } from "react-router-dom";

function MyBlog(props) {
  const {
    posts,
    update,
    setUpdate,
    updatePost,
    updateId,
    handleUpdate
  } = props;

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

  return (
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
          <button>delete</button>
        </li>
      ))}
    </ul>
  );
}

export default MyBlog;
