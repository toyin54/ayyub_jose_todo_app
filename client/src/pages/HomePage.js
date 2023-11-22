import React, { useEffect, useContext } from "react";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";
import PostList from "../post/PostList";
import { Link } from "react-router-dom"
import './homepage.css'
export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);
  const [posts, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));
  useEffect(() => {
    getPosts();
  }, [state?.user?.access_token]);
  useEffect(() => {
    if (posts && posts.isLoading === false && posts.data) {
      dispatch({ type: "FETCH_POSTS", posts: posts.data.posts.reverse() });
    }
  }, [posts]);
  return (
    <div className="about-page-container">
    
    <div className="about-page-content">
        <h1>Welcome to Ayyub Jose Todo Applicaion</h1>
    </div>
    <div className="about-page-cta">
        <Link className="link-button" to="/posts">Create Todo List</Link>
    </div>
</div>
  );
}