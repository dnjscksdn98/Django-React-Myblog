import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import BlogCreate from "../components/BlogCreate";
import { getCategories } from "../modules/categories";
import { createPost } from "../modules/createPost";

function BlogCreateContainer() {
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
    content: ""
  });
  const { title, overview, thumbnail, content } = formData;

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectChange = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedCategories(value);
  };

  const onSubmit = event => {
    dispatch(createPost(formData, selectedCategories));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error.</h2>;
  if (blogId) return <Redirect to={`/blog/${blogId}`} />;
  if (!categories) return <h2>Loading...</h2>;

  return (
    <BlogCreate
      categories={categories}
      title={title}
      overview={overview}
      thumbnail={thumbnail}
      selectedCategories={selectedCategories}
      content={content}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  );
}

export default BlogCreateContainer;
