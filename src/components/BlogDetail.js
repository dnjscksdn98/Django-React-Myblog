import React from "react";
import ReactSafeHtml from "react-safe-html";

function BlogDetail(props) {
  const { post, handleChange, comment, handleSubmit } = props;

  return (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <div style={{ maxWidth: "100%" }}>
        <h1 style={{ textAlign: "center" }}>{post.title}</h1>
        <div style={{ width: "500px" }}>
          <img
            src={post.thumbnail}
            alt="thumbnail"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <ReactSafeHtml html={post.content} />
        <hr />

        {post.comment_count < 1 ? (
          <span>No comments.</span>
        ) : (
          post.comments.map(comment => (
            <React.Fragment key={comment.id}>
              <h3>{comment.user.username}</h3>
              <p>{comment.content}</p>
            </React.Fragment>
          ))
        )}

        <form onSubmit={handleSubmit} method="POST">
          <input
            placeholder="Leave a comment."
            name="comment"
            value={comment}
            onChange={handleChange}
            autoComplete="off"
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}

export default BlogDetail;
