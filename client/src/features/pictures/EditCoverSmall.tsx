import { Dispatch, SetStateAction, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { FaGlobeEurope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ImagePosition } from "../../types/images";
import Button from "../../ui/Button";
import { getLoading } from "../profile/profileSlice";
import { useCover } from "../profile/useCover";
import { getUser } from "../user/userSlice";

interface EditCoverSmallProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

function EditCoverSmall({ image, setImage }: EditCoverSmallProps) {
  const [position, setPosition] = useState<ImagePosition>({ x: 0.5, y: 0.5 });

  const { updateCover } = useCover();
  const user = useSelector(getUser);
  const loading = useSelector(getLoading);

  const ref = useRef<AvatarEditor>(null);

  function handlePositionChange(position: ImagePosition) {
    setPosition(position);
  }

  async function handleSaveCover() {
    if (!user) return;

    if (ref.current) {
      const imageUrl = ref.current.getImageScaledToCanvas().toDataURL();

      setImage(imageUrl);
      await updateCover(imageUrl, user);
      setImage("");
    }
  }

  return (
    <div className="bg-primary flex flex-col gap-4">
      <div className="mx-auto w-[90%] overflow-hidden rounded-md">
        <AvatarEditor
          ref={ref}
          image={image}
          crossOrigin="anonymous"
          width={1000}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            cursor: "move",
          }}
          height={350}
          border={0}
          color={[255, 255, 255, 0.1]}
          position={position}
          onPositionChange={handlePositionChange}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="separator flex w-full items-center self-start border-b pb-3">
          <div className="text-tertiary flex items-center gap-2 px-3">
            <FaGlobeEurope className="text-xl" />
            <span>Your cover photo is public.</span>
          </div>
        </div>
        <div className="flex gap-2 self-end px-3">
          <button
            className="bg-tertiary-hover rounded-md text-sm font-semibold text-blue-300"
            onClick={() => setImage("")}
          >
            Cancel
          </button>
          <Button
            className="bg-blue-600 px-6 text-sm font-semibold hover:bg-blue-500"
            onClick={handleSaveCover}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditCoverSmall;
