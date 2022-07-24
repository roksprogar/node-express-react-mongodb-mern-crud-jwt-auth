import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getUser, getToken } from "./helpers";

const PostCreate = () => {
  const [state, setState] = useState({
    title: "",
    user: getUser(),
  });

  const [content, setContent] = useState("");

  // Rich text editor handle change.

  // Destructure values.
  const { title, user } = state;

  // Onchange event handler.
  const handleChange = (name) => (event) => {
    // console.log('name', name, 'event', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('title', title, 'user', user, 'content', content)
    axios
      .post(
        `${process.env.REACT_APP_API}/create`,
        { title, content, user },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        // Empty the State.
        setState({ ...state, title: "", user: "" });
        setContent("");
        alert(`A new post titled ${response.data.title} created!`);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>Create post</h1>
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
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              // console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              setContent(editor.getData());
              // console.log({ event, editor, data });
            }}
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
          <button className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
