import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getImages } from "./imagesSlice";

interface ChooseCoverProps {
  uploadCoverRef: React.RefObject<HTMLElement>;
  handleChooseImage: (imageUrl: string) => void;
}

function ChooseCover({ uploadCoverRef, handleChooseImage }: ChooseCoverProps) {
  const images = useSelector(getImages);

  return (
    <div className="bg-primary text-secondary flex flex-col gap-3 rounded-md py-4">
      <div className="separator border-b pb-4 text-center text-base font-bold sm:text-xl">
        Choose Cover Photo
      </div>

      <div className="flex flex-col gap-3 px-3">
        <button
          className="flex w-full flex-row items-center justify-center gap-1 rounded-md bg-blue-500 bg-opacity-10 py-2 font-semibold text-blue-500 hover:bg-opacity-20"
          onClick={() => {
            uploadCoverRef.current?.click();
          }}
        >
          <BsPlus className="text-xl" />
          <span>Upload photo</span>
        </button>
        <div className="flex flex-col gap-3">
          <p className="text-secondary text-lg font-semibold">Cover pictures</p>
          <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-md">
            {images.map((image) => {
              if (image.type === "cover")
                return (
                  <img
                    key={image.url}
                    src={image.url}
                    className="aspect-square h-full w-full cursor-pointer object-cover hover:brightness-110"
                    onClick={() => handleChooseImage(image.url)}
                  />
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseCover;
