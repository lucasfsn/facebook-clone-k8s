import { useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { handleAddImage } from "../../utils/helpers";
import EditProfilePicture from "../profile/EditProfilePicture";
import { getImages } from "./imagesSlice";

function ChoosePicture() {
  const [image, setImage] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const images = useSelector(getImages);

  return (
    <div className="bg-primary text-secondary flex flex-col gap-3 rounded-md py-4">
      <div className="separator border-b pb-4 text-center text-base font-bold sm:text-xl">
        Choose profile picture
      </div>
      {image ? (
        <EditProfilePicture image={image} setImage={setImage} />
      ) : (
        <div className="flex flex-col gap-3 px-3">
          <button
            className="flex w-full flex-row items-center justify-center gap-1 rounded-md bg-blue-500 bg-opacity-10 py-2 font-semibold text-blue-500 hover:bg-opacity-20"
            onClick={() => {
              ref.current?.click();
            }}
          >
            <input
              type="file"
              ref={ref}
              accept="image/jpeg,image/png"
              onChange={(e) => {
                handleAddImage(e, setImage);
              }}
              hidden
            />
            <BsPlus className="text-xl" />
            <span>Upload photo</span>
          </button>
          <div className="flex flex-col gap-3">
            <p className="text-secondary text-lg font-semibold">
              Profile pictures
            </p>
            <div className="grid grid-cols-4 gap-2 overflow-hidden">
              {images.map((image) => {
                if (image.type === "profile")
                  return (
                    <img
                      key={image.url}
                      src={image.url}
                      className="aspect-square h-full w-full cursor-pointer rounded-md object-cover hover:brightness-110"
                      onClick={() => setImage(image.url)}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChoosePicture;
