import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "../auth/react-auth0-spa";

import BlogUpdate from "../components/BlogUpdate";
import { getCategories } from "../modules/categories";
import { updateMyPost } from "../modules/updatePost";

function BlogUpdateContainer(props) {
  const updatePost = props.location.state.updatePost;
  const updateId = props.location.state.updateId;

  const { getTokenSilently } = useAuth0();

  const { loading, blogId, error, categories } = useSelector(
    state => ({
      loading: state.updatePost.loading,
      blogId: state.updatePost.blogId,
      error: state.updatePost.error,
      categories: state.categories.categories
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: updatePost.title,
    overview: updatePost.overview,
    thumbnail: updatePost.thumbnail,
    content: updatePost.content
  });
  const { title, overview, thumbnail, content } = formData;

  const initialState = [].concat(updatePost.category.map(c => c.title));
  const [selectedCategories, setSelectedCategories] = useState(initialState);

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

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      content: data
    });
  };

  const onSubmit = async () => {
    const token = await getTokenSilently();
    dispatch(updateMyPost(formData, updateId, selectedCategories, token));
  };

  useEffect(() => {
    async function dispatchGetCategories() {
      const token = await getTokenSilently();
      dispatch(getCategories(token));
    }
    dispatchGetCategories();
  }, [getTokenSilently, dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error.</h2>;
  if (blogId) return <Redirect to={`/blog/${blogId}`} />;
  if (!categories) return null;

  return (
    <BlogUpdate
      categories={categories}
      title={title}
      overview={overview}
      thumbnail={thumbnail}
      selectedCategories={selectedCategories}
      content={content}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      handleContentChange={handleContentChange}
      onSubmit={onSubmit}
    />
  );
}

export default BlogUpdateContainer;
