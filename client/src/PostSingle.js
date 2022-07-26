import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import parse from "html-react-parser";

const PostSingle = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        alert(`Error loading single post: ${error?.message}`);
      });
  }, [props.match.params.slug]);

  const showSinglePost = () => {
    return (
      <div className="row">
        <div className="col-md-8 offset-md-2 pt-3 pb-2">
          <h1>{post.title}</h1>
          <p>
            Author <span className="badge bg-secondary">{post.user}</span>{" "}
            Published on{" "}
            <span className="badge bg-secondary">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </p>
          <div className="lead pt-3">{parse(post.content ?? "")}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container pb-5">
      <Nav />
      {post && showSinglePost()}
    </div>
  );
};

export default PostSingle;
