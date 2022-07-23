import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

const PostUpdate = (props) => {
  const [state, setState] = useState({
    title: "",
    content: "",
    slug: "",
    user: "",
  });

  const { title, content, slug, user } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, slug, user } = response.data;
        setState({ ...state, title, content, slug, user });
      })
      .catch((error) => {
        alert(`Error loading single post: ${error?.message}`);
      });
  }, [props.match.params.slug]);

  // Onchange event handler.
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API}/post/update/${slug}`, {
        title,
        content,
        user,
      })
      .then((response) => {
        const { title, content, slug, user } = response.data;
        // Set the State.
        setState({ ...state, title, content, slug, user });
        alert(`A new post titled ${title} updated!`);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>Update post: {state.title}</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="text-muted">Title</label>
          <input
            onChange={handleChange("title")}
            value={title}
            type="text"
            className="form-control"
            placeholder="Post title"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="text-muted">Content</label>
          <textarea
            onChange={handleChange("content")}
            value={content}
            type="text"
            className="form-control"
            placeholder="Write some content"
          />
        </div>
        <div className="form-group mb-3">
          <label className="text-muted">User</label>
          <input
            onChange={handleChange("user")}
            value={user}
            type="text"
            className="form-control"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default PostUpdate;
