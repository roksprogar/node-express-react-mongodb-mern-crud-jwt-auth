import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import parse from "html-react-parser";
import { getUser, getToken } from "./helpers";

const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/`)
      .then((response) => {
        // console.log(response)
        setPosts(response.data);
      })
      .catch((error) => {
        alert(`Error fetching posts: ${error?.message}`);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      deletePost(slug);
    }
  };

  const deletePost = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch((error) => {
        alert(`Error loading single post: ${error?.message}`);
      });
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>MERN CRUD</h1>
      <hr />
      {/* {JSON.stringify(posts)} */}
      {posts.map((post, i) => (
        <div
          className="row"
          key={post._id}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <div className="row">
              <div className="col-md-10">
                <Link to={`/post/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <div className="lead pt-3">
                  {parse(post.content.substring(0, 200))}
                </div>
                <p>
                  Author <span className="badge bg-secondary">{post.user}</span>{" "}
                  Published on{" "}
                  <span className="badge bg-secondary">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
              {getUser() && (
                <div className="col-md-2">
                  <Link
                    to={`/post/update/${post.slug}`}
                    className="btn btn-sm btn-outline-warning me-1"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteConfirm(post.slug)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
