import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { FaGlobeEurope, FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ImagePosition } from "../../types/images";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import { getUser } from "../user/userSlice";
import { getLoading } from "./profileSlice";
import { useProfilePicture } from "./useProfilePicture";

interface EditProfilePictureProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

function EditProfilePicture({ image, setImage }: EditProfilePictureProps) {
  const [description, setDescription] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<ImagePosition>({ x: 0.5, y: 0.5 });

  const isLoading = useSelector(getLoading);
  const { updateProfilePicture } = useProfilePicture();

  const user = useSelector(getUser);

  const ref = useRef<AvatarEditor>(null);

  function handleScaleChange(e: ChangeEvent<HTMLInputElement>) {
    setScale(Number(e.target.value));
  }

  function handlePositionChange(position: ImagePosition) {
    setPosition(position);
  }

  async function handleSaveImage() {
    if (!user) return;

    if (ref.current) {
      const imageUrl = ref.current.getImageScaledToCanvas().toDataURL();

      if (imageUrl) {
        setImage(imageUrl);
        await updateProfilePicture(imageUrl, user, description);
        setImage("");
      }
    }
  }

  return (
    <div className="bg-primary flex flex-col gap-10">
      <div className="px-3">
        <textarea
          placeholder="Description"
          value={description}
          className="bg-primary separator text-secondary w-full resize-none rounded-md border p-3 focus:outline-none"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center gap-8">
        <AvatarEditor
          ref={ref}
          image={image}
          crossOrigin="anonymous"
          width={300}
          style={{
            cursor: "move",
          }}
          height={300}
          border={0}
          borderRadius={150}
          color={[255, 255, 255, 0.1]}
          position={position}
          scale={scale}
          onPositionChange={handlePositionChange}
        />
        <div className="flex w-2/3 items-center">
          <button
            className={`rounded-full p-2 ${
              scale === 1 ? "cursor-not-allowed" : "bg-tertiary-hover"
            }`}
            onClick={() => setScale((scale) => Math.max(scale - 0.1, 1))}
          >
            <FaMinus />
          </button>
          <input
            name="scale"
            value={scale}
            type="range"
            onChange={handleScaleChange}
            min="1"
            max="2"
            step="0.01"
            className="w-full cursor-pointer hover:bg-inherit hover:text-inherit"
          />
          <button
            className={`rounded-full p-2 ${
              scale === 2 ? "cursor-not-allowed" : "bg-tertiary-hover"
            }`}
            onClick={() => setScale((scale) => Math.min(scale + 0.1, 2))}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="separator flex w-full items-center self-start border-b pb-3">
          <div className="text-tertiary flex items-center gap-2 px-3">
            <FaGlobeEurope className="text-xl" />
            <span>Your profile picture is public.</span>
          </div>
        </div>
        <div className="flex gap-2 self-end px-3">
          <button
            className={`bg-tertiary-hover rounded-md text-sm font-semibold text-blue-300 disabled:cursor-not-allowed ${
              isLoading ? "min-w-[60px]" : "px-2.5 py-1.5"
            }`}
            onClick={() => setImage("")}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Cancel"}
          </button>
          <Button
            className="bg-blue-600 px-6 text-sm font-semibold hover:bg-blue-500"
            onClick={handleSaveImage}
            disabled={isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePicture;
