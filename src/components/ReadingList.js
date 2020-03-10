import React from "react";
import { Link } from "react-router-dom";

function ReadingList(props) {
  const { posts } = props;

  if (posts.length < 1) return <h2>You don't have any readings.</h2>;

  return (
    <React.Fragment>
      <h1>My Reading List</h1>
      <ul>
        {posts.map(post => (
          <li key={post.post.id}>
            <h2>
              <Link to={`/blog/${post.post.id}`}>{post.post.title}</Link>
            </h2>
            <b>{post.post.author.user.username}</b>
            <br />
            <b>{post.post.timestamp.substring(0, 10)}</b>
            <br />
            {post.post.category.map(c => (
              <div key={c.id}>
                {c.title}
                <br />
              </div>
            ))}
            <div>views : {post.post.view_count}</div>
            <div>comments : {post.post.comment_count}</div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default ReadingList;
