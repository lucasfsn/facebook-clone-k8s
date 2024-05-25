import { useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { SingleImage } from "../../types/images";
import { handleAddCover } from "../../utils/helpers";
import EditCoverSmall from "./EditCoverSmall";
import { getImages } from "./imagesSlice";

function ChooseCoverSmall() {
  const [image, setImage] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const images = useSelector(getImages);

  return (
    <div className="bg-primary text-secondary flex flex-col gap-3 rounded-md py-4">
      <div className="separator border-b pb-4 text-center text-base font-bold sm:text-xl">
        Choose Cover Photo
      </div>
      {image ? (
        <EditCoverSmall image={image} setImage={setImage} />
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
              onChange={(e) => handleAddCover(e, setImage)}
              hidden
            />
            <BsPlus className="text-xl" />
            <span>Upload photo</span>
          </button>
          <div className="flex flex-col gap-3">
            <p className="text-secondary text-lg font-semibold">Cover photos</p>
            <div className="grid grid-cols-4 gap-2 overflow-hidden">
              {images.map((image: SingleImage) => {
                if (image.type === "cover")
                  return (
                    <img
                      key={image.url}
                      src={image.url}
                      className="aspect-video h-full cursor-pointer rounded-md object-cover hover:brightness-110"
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

export default ChooseCoverSmall;
