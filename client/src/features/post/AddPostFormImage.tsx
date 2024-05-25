import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MAX_FILE_SIZE, VALID_MIMETYPES } from "../../utils/constants";
import ImagesPost from "../pictures/ImagesPost";

interface AddPostFormImageProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  setShowAddImage: Dispatch<SetStateAction<boolean>>;
}

function AddPostFormImage({
  images,
  setImages,
  setShowAddImage,
}: AddPostFormImageProps) {
  const imageRef = useRef<HTMLInputElement>(null);

  function handleAddImages(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    Array.from(e.target.files).forEach((file) => {
      if (!VALID_MIMETYPES.includes(file.type)) {
        toast.error("Selected file type is not supported");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Selected file is too large");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImages((prev) =>
            prev.includes(reader.result as string)
              ? prev
              : [...prev, reader.result as string],
          );
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function handleCloseAddImage() {
    setShowAddImage(false);
    setImages([]);
  }

  return (
    <div className="separator relative rounded-md border p-2">
      <div
        className={`bg-tertiary bg-tertiary-hover relative h-fit rounded-md ${
          images.length === 0 ? "cursor-pointer" : ""
        }`}
      >
        {images.length > 0 && (
          <div className="absolute left-2 top-2 z-10 flex flex-row gap-2">
            <button
              className="flex items-center justify-center gap-1.5 rounded-md bg-white px-3.5 py-1.5 text-sm font-semibold text-black"
              onClick={() => imageRef.current?.click()}
            >
              <MdAddPhotoAlternate />
              <span>Add Photos/Videos</span>
            </button>
          </div>
        )}
        <button
          className="bg-tertiary-hover bg-primary separator absolute right-2 top-2 z-20 cursor-pointer rounded-full border p-1"
          onClick={handleCloseAddImage}
        >
          <HiXMark className="text-xl text-gray-400" />
        </button>
        <input
          type="file"
          multiple
          hidden
          ref={imageRef}
          onChange={handleAddImages}
          accept="image/jpeg,image/png,image/gif"
        />
        <ImagesPost post={{ images, type: "post" }} enableSlider={false} />
        {images.length === 0 && (
          <div
            className="flex h-[150px] flex-col items-center justify-center"
            onClick={() => {
              imageRef.current?.click();
            }}
          >
            <div className="bg-post w-fit rounded-full p-2 text-2xl shadow-md">
              <MdAddPhotoAlternate className="translate-x-[0.05rem]" />
            </div>
            <span className="text-secondary">Add Photos/Videos</span>
            <span className="text-tertiary text-xs">or drag and drop</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPostFormImage;
