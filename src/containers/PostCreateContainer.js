import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import PostCreate from "../components/PostCreate";
import { getCategories } from "../modules/categories";
import { createPost } from "../modules/createPost";

function PostCreateContainer() {
  const { loading, blogId, error, categories } = useSelector(
    state => ({
      loading: state.create.loading,
      blogId: state.create.blogId,
      error: state.create.error,
      categories: state.categories.categories
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    thumbnail: "",
    category: "",
    content: ""
  });
  const { title, overview, thumbnail, category, content } = formData;

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    // event.preventDefault();
    dispatch(createPost(formData));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error.</h2>;
  if (blogId) return <Redirect to={`/blog/${blogId}`} />;
  if (categories === null) return <h2>There is no existing categories.</h2>;

  return (
    <PostCreate
      categories={categories}
      title={title}
      overview={overview}
      thumbnail={thumbnail}
      category={category}
      content={content}
      handleChange={handleChange}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  );
}

export default PostCreateContainer;
