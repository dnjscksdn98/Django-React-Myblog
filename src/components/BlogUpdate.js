import React from "react";
import { useForm } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function BlogUpdate(props) {
  const { register, handleSubmit } = useForm();
  const {
    categories,
    title,
    overview,
    thumbnail,
    selectedCategories,
    content,
    handleChange,
    handleSelectChange,
    formData,
    setFormData,
    onSubmit
  } = props;

  return (
    <div style={{ width: "550px", margin: "0 auto" }}>
      <div style={{ maxWidth: "100%" }}>
        <h1>Update your post</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            name="title"
            value={title}
            placeholder="Title"
            onChange={handleChange}
            ref={register({ required: true, maxLength: 30 })}
          />
          <br />
          <label htmlFor="overview">Overview</label>
          <br />
          <textarea
            id="overview"
            name="overview"
            value={overview}
            row="10"
            cols="40"
            placeholder="Overview"
            onChange={handleChange}
            ref={register({ required: true })}
          />
          <br />
          <label htmlFor="thumbnail">Thumbnail</label>
          <br />
          <input
            id="thumbnail"
            name="thumbnail"
            value={""}
            type="file"
            onChange={handleChange}
            // ref={register()}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <select
            id="category"
            name="category"
            value={selectedCategories}
            multiple
            onChange={handleSelectChange}
            ref={register({ required: true })}
          >
            {categories.map(c =>
              selectedCategories.indexOf(c.title) !== -1 ? (
                <option selected value={c.title} key={c.id}>
                  {c.title}
                </option>
              ) : (
                <option value={c.title} key={c.id}>
                  {c.title}
                </option>
              )
            )}
          </select>
          <br />
          <label htmlFor="content">Content</label>
          <br />
          <div id="content">
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onInit={editor => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData({
                  ...formData,
                  content: data
                });
              }}
            />
          </div>

          <br />
          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
}

export default BlogUpdate;
