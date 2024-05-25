import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Spinner from "../../ui/Spinner";
import { getUserId } from "../user/userSlice";
import Post from "./Post";
import { getAllPosts, getLoading, getPosts } from "./postSlice";

function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const userId = useSelector(getUserId);
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    if (userId) dispatch(getPosts(userId));
  }, [dispatch, posts.length, userId]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
