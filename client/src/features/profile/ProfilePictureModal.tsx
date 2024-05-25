import { RefObject, useState } from "react";
import { BsPersonSquare } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { IoIosImages } from "react-icons/io";
import { useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import ImageSlider from "../../ui/ImageSlider";
import Modal from "../../ui/Modal";
import ChoosePicture from "../pictures/ChoosePicture";
import { getUser } from "../user/userSlice";
import { getProfilePicture } from "./profileSlice";
import { useProfilePicture } from "./useProfilePicture";

interface ProfilePictureModalProps {
  button: RefObject<HTMLImageElement>;
  isProfileOwner: boolean;
  close: () => void;
}

function ProfilePictureModal({
  button,
  isProfileOwner,
  close,
}: ProfilePictureModalProps) {
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const profilePicture = useSelector(getProfilePicture);
  const user = useSelector(getUser);
  const { removeProfilePicture } = useProfilePicture();

  const { ref } = useOutsideClick(
    () => {
      if (!isModalOpen) {
        close();
        setIsModalOpen(false);
      }
    },
    true,
    button,
  );

  function handleCloseSlider() {
    setShowSlider(false);
  }

  return (
    <>
      {showSlider && (
        <ImageSlider images={[profilePicture]} close={handleCloseSlider} />
      )}
      <div
        className="bg-primary text-secondary absolute left-0 top-full z-10 flex w-[300px] flex-col rounded-lg p-2 shadow-3xl"
        ref={ref}
      >
        <div
          className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
          onClick={() => setShowSlider(true)}
        >
          <BsPersonSquare />
          <span>See profile picture</span>
        </div>
        {isProfileOwner && (
          <>
            <Modal>
              <Modal.Open opens="picture">
                <div
                  className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
                  onClick={() => setIsModalOpen(true)}
                >
                  <IoIosImages />
                  <span>Choose profile picture</span>
                </div>
              </Modal.Open>
              <Modal.Window
                name="picture"
                type="center"
                onClose={() => setIsModalOpen(false)}
              >
                <ChoosePicture />
              </Modal.Window>
            </Modal>
            <div
              className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
              onClick={() => {
                if (user) removeProfilePicture(user);
              }}
            >
              <HiOutlineTrash />
              <span>Remove picture</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePictureModal;
