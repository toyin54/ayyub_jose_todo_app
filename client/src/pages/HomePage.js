import React, { useEffect, useContext } from "react";
import { StateContext } from "../components/contexts";
import { useResource } from "react-request-hook";
// import PostList from "../post/PostList";

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
    <div>Hello</div>
    // <>
    //   {posts?.isLoading && "Posts loading..."} <PostList />
    // </>
  );
}