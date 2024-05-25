import { formatDistanceToNow } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaGlobeEurope, FaLock, FaUserFriends } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  PostAudience,
  ReactionType,
  SingleComment,
  SinglePost,
} from "../../types/posts";
import { MAX_COMMENTS } from "../../utils/constants";
import { capitalize, reactionColor } from "../../utils/helpers";
import ImagesPost from "../pictures/ImagesPost";
import { getUser } from "../user/userSlice";
import AddComment from "./AddComment";
import Comment from "./Comment";
import PostMenu from "./PostMenu";
import ReactionsModal from "./ReactionsModal";
import { useReaction } from "./useReaction";

export interface PostProps {
  post: SinglePost;
}

function Post({ post }: PostProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [comments, setComments] = useState<SingleComment[]>(post.comments);
  const [commentsCount, setCommentsCount] = useState<number>(MAX_COMMENTS);

  const [activeLike, setActiveLike] = useState<boolean>(false);
  const [hoverReaction, setHoverReaction] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [addedNewReaction, setAddedNewReaction] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const nodeRef = useRef(null);
  const commentRef = useRef<HTMLInputElement>(null);

  const user = useSelector(getUser);

  const { reactions, reaction, reactionsCount, getReactions, addReaction } =
    useReaction();

  useEffect(() => {
    setComments([...post.comments].reverse());
  }, [post.comments]);

  useEffect(() => {
    if (!user) return;

    async function getAllReactions() {
      if (!user) return;

      await getReactions(post._id, user.id);

      setAddedNewReaction(false);
    }

    getAllReactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post._id, user, addedNewReaction]);

  function handleShowMoreComments() {
    if (commentsCount < comments.length)
      setCommentsCount((prev) => prev + MAX_COMMENTS);
  }

  const audienceIcon = useMemo(() => {
    switch (post.audience) {
      case PostAudience.Public:
        return <FaGlobeEurope />;
      case PostAudience.Friends:
        return <FaUserFriends />;
      case PostAudience.Private:
        return <FaLock />;
    }
  }, [post.audience]);

  async function handleAddReaction(r: ReactionType | undefined = reaction) {
    if (!user) return;

    await addReaction(r || "like", post._id, user);
    setAddedNewReaction(true);
  }

  function postContent() {
    switch (post.type) {
      case "post":
        return (
          <span className="text-lg font-semibold">
            {post.user.firstName} {post.user.lastName}
          </span>
        );
      case "cover":
      case "profile":
        return (
          <div className="flex flex-row items-center gap-1.5">
            <span className="font-semibold">
              {post.user.firstName} {post.user.lastName}
            </span>
            <span className="text-tertiary text-sm sm:text-base">
              updated{" "}
              {post.type === "cover" ? "cover photo" : "profile picture"}.
            </span>
          </div>
        );
      case "details":
        return (
          <div className="flex flex-row items-center gap-1.5">
            <span className="font-semibold">
              {post.user.firstName} {post.user.lastName}
            </span>
            <span className="text-tertiary">updated {post.key}</span>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="bg-primary flex flex-col gap-2 rounded-lg">
      <div className="px-3 pt-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Link to={`/profile/${post.user.username}`}>
              <img
                src={post.user.picture}
                alt={post.user.username}
                className="h-[40px] w-auto rounded-full"
              />
            </Link>
            <div className="flex flex-col">
              {postContent()}
              <div className="text-tertiary flex flex-row items-center gap-1.5 text-xs">
                <span>{formatDistanceToNow(new Date(post.createdAt))}</span>
                <span>{audienceIcon}</span>
              </div>
            </div>
          </div>
          {post.user._id === user?.id && (
            <div className="relative">
              <button
                className="bg-tertiary-hover cursor-pointer rounded-full p-1.5 text-center"
                onClick={() => setShowMenu((show) => !show)}
                ref={buttonRef}
              >
                <HiDotsHorizontal className="text-xl" />
              </button>
              {showMenu && (
                <PostMenu close={() => setShowMenu(false)} post={post} />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {post.type === "details" ? (
          <div className="text-secondary flex h-20 flex-col items-center justify-center gap-2">
            <div className="bg-tertiary rounded-full p-2">
              <TbListDetails className="text-2xl" />
            </div>
            <span className="text-xl">{post.content}</span>
          </div>
        ) : (
          <span className="px-3">{post.content}</span>
        )}
        {post.images?.length !== 0 && <ImagesPost post={post} />}
      </div>
      <div className="text-tertiary flex flex-col gap-1 px-3">
        <div className="separator flex flex-row justify-between border-b pb-1">
          <div className="text-tertiary flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {reactions
                ?.map((reaction) => {
                  return (
                    reaction.count > 0 && (
                      <div
                        key={reaction.reaction}
                        className="relative rounded-full"
                      >
                        <img
                          src={`../../../reaction-emoji/${reaction.reaction}.jpg`}
                          className="aspect-square h-[15px] cursor-pointer rounded-full"
                          onMouseEnter={() =>
                            setHoverReaction(reaction.reaction)
                          }
                          onMouseLeave={() => setHoverReaction(null)}
                        />
                        {hoverReaction === reaction.reaction && (
                          <span className="absolute bottom-full left-0 flex w-fit rounded-md bg-black bg-opacity-80 text-white">
                            <div className="flex flex-col gap-1 px-2.5 py-1.5">
                              <span className="text-sm font-semibold">
                                {capitalize(reaction.reaction)}
                              </span>
                              <div className="flex flex-col text-xs shadow-3xl">
                                {reaction.users
                                  .map((user, i) => (
                                    <span
                                      key={`${user._id}-${i}`}
                                      className="whitespace-nowrap"
                                    >
                                      {user.firstName} {user.lastName}
                                    </span>
                                  ))
                                  .slice(0, 10)}
                                {reaction.users.length > 10 && (
                                  <span>
                                    and {reaction.users.length - 10} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </span>
                        )}
                      </div>
                    )
                  );
                })
                .slice(0, 3)}
            </div>
            <span>{reactionsCount > 0 ? reactionsCount : ""}</span>
          </div>
          {comments.length > 0 && (
            <div
              className="ml-auto cursor-pointer hover:underline"
              onClick={() => commentRef.current?.focus()}
            >
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </div>
          )}
        </div>
        <div className="separator text-secondary relative grid grid-cols-2 border-b pb-1">
          <CSSTransition
            nodeRef={nodeRef}
            in={activeLike}
            timeout={800}
            classNames="slide-up"
            unmountOnExit
          >
            <ReactionsModal
              ref={nodeRef}
              setActiveLike={setActiveLike}
              handleAddReaction={handleAddReaction}
            />
          </CSSTransition>
          <button
            className="bg-tertiary-hover flex flex-row items-center justify-center gap-1.5 rounded-md p-0.5 text-xl font-semibold disabled:cursor-not-allowed"
            onMouseEnter={() => {
              const id = setTimeout(() => {
                setActiveLike(true);
              }, 800);
              setTimeoutId(id);
            }}
            onMouseLeave={() => {
              const id = setTimeout(() => {
                setActiveLike(false);
              }, 800);
              setTimeoutId(id);
            }}
            onClick={() => {
              if (timeoutId) {
                clearTimeout(timeoutId);
              }
              handleAddReaction();
            }}
            disabled={addedNewReaction}
          >
            {reaction ? (
              <img
                src={`../../../reaction-emoji/${reaction}.jpg`}
                className="aspect-square w-[18px] translate-y-[1px] rounded-full"
              />
            ) : (
              <AiOutlineLike />
            )}
            <span className={`text-[0.95rem] ${reactionColor(reaction)}`}>
              {reaction ? capitalize(reaction) : "Like"}
            </span>
          </button>
          <button
            className="bg-tertiary-hover flex flex-row items-center justify-center gap-1.5 rounded-md p-0.5 text-xl font-semibold"
            onClick={() => commentRef.current?.focus()}
          >
            <IoChatbubbleOutline className="rotate-[270deg]" />
            <span className="text-[0.95rem]">Comment</span>
          </button>
        </div>
        <AddComment postId={post._id} ref={commentRef} />
        <div className="flex max-h-[150px] flex-col gap-3 overflow-y-scroll py-3">
          {comments &&
            comments
              .slice(0, commentsCount)
              .map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                />
              ))}
          {comments.length > MAX_COMMENTS &&
            commentsCount < comments.length && (
              <div
                className="text-tertiary flex justify-between text-[0.92rem]"
                onClick={handleShowMoreComments}
              >
                <div className="cursor-pointer font-semibold hover:underline">
                  View more comments
                </div>
                <div className="pr-4">
                  {Math.min(commentsCount, comments.length)} of{" "}
                  {comments.length}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Post;
