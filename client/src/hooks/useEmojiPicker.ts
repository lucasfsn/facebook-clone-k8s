import { useState } from "react";

export function useEmojiPicker() {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  function handleShowEmojiPicker() {
    setShowEmojiPicker((show) => !show);
  }

  return {
    showEmojiPicker,
    handleShowEmojiPicker,
  };
}
