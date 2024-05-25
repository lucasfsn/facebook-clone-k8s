import { RefObject, useState } from "react";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import { IoIosImages } from "react-icons/io";
import { useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Modal from "../../ui/Modal";
import { useCover } from "../profile/useCover";
import { getUserId } from "../user/userSlice";
import ChooseCover from "./ChooseCover";

interface CoverPhotoModalProps {
  button: RefObject<HTMLButtonElement>;
  close: () => void;
  uploadCoverRef: RefObject<HTMLInputElement>;
  showRemove: boolean;
  handleChooseImage: (imageUrl: string) => void;
}

function CoverPhotoModal({
  button,
  close,
  uploadCoverRef,
  showRemove,
  handleChooseImage,
}: CoverPhotoModalProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userId = useSelector(getUserId);
  const { removeCover } = useCover();

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

  return (
    <div
      className="bg-primary text-secondary absolute right-4 z-10 flex w-[300px] flex-col rounded-lg p-2"
      ref={ref}
    >
      <Modal>
        <Modal.Open opens="picture">
          <div
            className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
            onClick={() => setIsModalOpen(true)}
          >
            <IoIosImages />
            <span>Choose cover photo</span>
          </div>
        </Modal.Open>
        <Modal.Window
          name="picture"
          type="center"
          onClose={() => setIsModalOpen(false)}
        >
          <ChooseCover
            uploadCoverRef={uploadCoverRef}
            handleChooseImage={handleChooseImage}
          />
        </Modal.Window>
      </Modal>
      <div
        className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
        onClick={() => {
          uploadCoverRef.current?.click();
        }}
      >
        <HiOutlineUpload />
        <span>Upload photo</span>
      </div>
      {showRemove && (
        <div
          className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1"
          onClick={() => {
            if (userId) removeCover(userId);
          }}
        >
          <HiOutlineTrash />
          <span>Remove</span>
        </div>
      )}
    </div>
  );
}

export default CoverPhotoModal;
