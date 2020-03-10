import React from "react";
import { Link } from "react-router-dom";

function Blog(props) {
  const { posts } = props;

  return (
    <React.Fragment>
      <h1>Blog Posts</h1>
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
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default React.memo(Blog);
