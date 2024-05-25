import { formatDistanceToNow } from "date-fns";
import { useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { SingleComment } from "../../types/posts";
import { getUserProfile } from "../profile/profileSlice";
import { getUserId } from "../user/userSlice";
import { useComment } from "./useComment";

interface CommentProps {
  comment: SingleComment;
  postId: string;
}

function Comment({ comment, postId }: CommentProps) {
  const userId = useSelector(getUserId);
  const [menu, showMenu] = useState(false);

  const profile = useSelector(getUserProfile);

  const { deleteComment } = useComment();

  const buttons = useRef(null);
  const { ref } = useOutsideClick(() => showMenu(false), true, buttons);

  async function handleDeleteComment() {
    await deleteComment(postId, comment._id, profile.username);
  }

  return (
    <div className="flex gap-2">
      <Link to={`/profile/${comment.author.username}`}>
        <img
          src={comment.author.picture}
          alt={comment.author.firstName}
          className="aspect-square h-[35px] rounded-full"
        />
      </Link>
      <div className="flex flex-col gap-2">
        <div className="bg-tertiary relative flex w-fit flex-col rounded-[1.25rem] px-3 py-2">
          <div className="text-secondary">
            {comment.author.firstName} {comment.author.lastName}
          </div>
          <div className="text-comment text-[0.95rem]">{comment.comment}</div>
          {userId === comment.author._id ? (
            <div className="absolute left-full top-1/2 -translate-y-1/2 translate-x-1">
              <div
                className="bg-tertiary-hover cursor-pointer rounded-full p-1.5"
                onClick={() => showMenu((show) => !show)}
                ref={ref}
              >
                <HiDotsHorizontal />
              </div>
              {menu && (
                <div
                  className="bg-secondary text-secondary absolute right-0 top-full w-[100px] translate-x-1 rounded-md p-2"
                  ref={buttons}
                  onClick={handleDeleteComment}
                >
                  <div className="bg-tertiary-hover cursor-pointer rounded-sm px-1.5 py-0.5 text-center">
                    Delete
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
        {comment.image && (
          <img
            src={comment.image}
            alt="comment"
            className="-mt-2 w-[100px] rounded-[1.25rem]"
          />
        )}
        <span className="pl-3 text-xs">
          {formatDistanceToNow(new Date(comment.commentDate))}
        </span>
      </div>
    </div>
  );
}

export default Comment;
