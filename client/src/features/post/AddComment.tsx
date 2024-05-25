import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { forwardRef, useRef, useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { IoCameraOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext";
import { useEmojiPicker } from "../../hooks/useEmojiPicker";
import { handleAddImage, setEmojiPickerMode } from "../../utils/helpers";
import { getUserProfile } from "../profile/profileSlice";
import { getUser } from "../user/userSlice";
import { useComment } from "./useComment";

interface AddCommentProps {
  postId: string;
}

const AddComment = forwardRef<HTMLInputElement, AddCommentProps>(
  ({ postId }, ref) => {
    const [comment, setComment] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const inputRef = useRef<HTMLInputElement>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const { addComment } = useComment();
    const { darkMode } = useDarkMode();
    const { showEmojiPicker, handleShowEmojiPicker } = useEmojiPicker();
    const user = useSelector(getUser);

    const profile = useSelector(getUserProfile);

    function handleAddEmoji({ emoji }: EmojiClickData) {
      const ref = inputRef.current;
      ref?.focus();

      setComment((prev) => prev + emoji);
    }

    async function handleAddComment(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key !== "Enter") return;
      if (!user) return;

      await addComment(comment, image, postId, user, profile.username);
    }

    return (
      <div className="flex flex-col gap-4 py-3">
        <div className="flex flex-row items-center gap-1.5">
          <img
            src={user?.picture}
            alt={user?.firstName}
            className="w-[35px] rounded-full"
          />
          <div className="bg-tertiary relative flex flex-grow flex-row items-center justify-between rounded-full px-3 py-1">
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 z-50">
                <EmojiPicker
                  emojiStyle={EmojiStyle.FACEBOOK}
                  theme={setEmojiPickerMode(darkMode)}
                  height={225}
                  width={350}
                  searchDisabled={true}
                  skinTonesDisabled={true}
                  previewConfig={{
                    showPreview: false,
                  }}
                  lazyLoadEmojis={true}
                  onEmojiClick={handleAddEmoji}
                />
              </div>
            )}
            <input
              type="file"
              ref={inputFileRef}
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => handleAddImage(e, setImage)}
              hidden
            />
            <input
              type="text"
              className="text-secondary w-full bg-transparent outline-none"
              placeholder="Write a public comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyUp={handleAddComment}
              ref={ref}
            />
            <div className="flex flex-row">
              <div
                className="bg-tertiary-hover cursor-pointer rounded-full p-2"
                onClick={handleShowEmojiPicker}
              >
                <FaRegSmile />
              </div>
              <div
                className="bg-tertiary-hover cursor-pointer rounded-full p-2"
                onClick={() => inputFileRef.current?.click()}
              >
                <IoCameraOutline />
              </div>
            </div>
          </div>
        </div>
        {image && (
          <div className="relative">
            <img
              src={image}
              alt="comment-image"
              className="ml-[45px] h-[70px] self-start object-contain"
            />
            <button
              className="bg-tertiary-hover bg-tertiary absolute right-2 top-0 z-20 cursor-pointer rounded-full p-1"
              onClick={() => setImage("")}
            >
              <HiXMark className="text-white" />
            </button>
          </div>
        )}
      </div>
    );
  },
);

export default AddComment;
