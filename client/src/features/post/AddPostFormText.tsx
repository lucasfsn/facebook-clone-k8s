import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { FaRegSmile } from "react-icons/fa";
import { useDarkMode } from "../../context/DarkModeContext";
import { useEmojiPicker } from "../../hooks/useEmojiPicker";
import { setEmojiPickerMode } from "../../utils/helpers";

interface AddPostFormTextProps {
  firstName: string | undefined;
  post: string;
  setPost: Dispatch<SetStateAction<string>>;
  isShowingImage: boolean;
}

function AddPostFormText({
  firstName,
  post,
  setPost,
  isShowingImage,
}: AddPostFormTextProps) {
  const { darkMode } = useDarkMode();
  const { showEmojiPicker, handleShowEmojiPicker } = useEmojiPicker();
  const postRef = useRef<HTMLTextAreaElement>(null);

  function handleAddEmoji({ emoji }: EmojiClickData) {
    postRef.current?.focus();

    setPost((prev) => prev + emoji);
  }

  return (
    <div className="relative">
      <textarea
        ref={postRef}
        value={post}
        maxLength={150}
        placeholder={`What's on your mind, ${firstName}?`}
        onChange={(e) => setPost(e.target.value)}
        className={`bg-primary w-full resize-none focus:outline-none ${
          isShowingImage ? "h-min text-base" : "h-40 text-2xl"
        }`}
      />
      {showEmojiPicker && (
        <div
          className={`absolute z-50 ${
            isShowingImage ? "-right-1/2 top-8" : "-right-1/3 bottom-8"
          }`}
        >
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
      <FaRegSmile
        className={`text-tertiary absolute right-2 cursor-pointer text-2xl transition-all hover:text-gray-300 ${
          isShowingImage ? "top-0" : "bottom-0"
        }`}
        onClick={handleShowEmojiPicker}
      />
    </div>
  );
}

export default AddPostFormText;
