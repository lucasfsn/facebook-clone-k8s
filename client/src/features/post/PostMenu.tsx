import { HiOutlineTrash, HiPencil } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { SinglePost } from "../../types/posts";
import Modal from "../../ui/Modal";
import { getUser } from "../user/userSlice";
import EditPostForm from "./EditPostForm";
import { useDeletePost } from "./useDeletePost";

interface PostMenuProps {
  close: () => void;
  post: SinglePost;
}

function PostMenu({ close, post }: PostMenuProps) {
  const user = useSelector(getUser);

  const { deletePost } = useDeletePost();

  return (
    <div className="bg-primary text-secondary absolute right-0 z-50 flex w-[325px] flex-col gap-3 rounded-md p-1.5 shadow-3xl">
      {post.type === "post" && (
        <Modal>
          <Modal.Open opens="edit-post">
            <div className="separator bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-1 py-1.5">
              <HiPencil className="text-2xl" />
              <div className="flex flex-col">
                <span>Edit post</span>
              </div>
            </div>
          </Modal.Open>
          <Modal.Window name="edit-post" type="center">
            <EditPostForm post={post} close={close} />
          </Modal.Window>
        </Modal>
      )}
      <div
        className="separator bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-1 py-1"
        onClick={() => {
          if (user) deletePost(post, user.username);
          close();
        }}
      >
        <HiOutlineTrash className="text-2xl" />
        <div className="flex flex-col">
          <span>Move to trash</span>
          <span className="text-tertiary text-xs">
            Items in your trash are deleted immediately.
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostMenu;
