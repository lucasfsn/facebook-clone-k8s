import { useState } from "react";
import { FaCity } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiHeart, HiHome } from "react-icons/hi2";
import { IoSchool } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Details, SingleProfile } from "../../types/profile";
import Modal from "../../ui/Modal";
import ChooseCoverSmall from "../pictures/ChooseCoverSmall";
import ChoosePicture from "../pictures/ChoosePicture";
import { getUserId } from "../user/userSlice";
import EditDetails from "./EditDetails";
import ProfileDetails from "./ProfileDetails";
import { useDetails } from "./useDetails";

interface EditProfileProps {
  profile: SingleProfile;
}

function EditProfile({ profile }: EditProfileProps) {
  const [details, setDetails] = useState<Details>(profile.details);

  const userId = useSelector(getUserId);
  const { updateDetails } = useDetails();

  async function handleSave() {
    if (!userId) return;

    const updatedDetails = Object.entries(details).reduce(
      (acc, [key, value]) => {
        if (value !== profile.details[key as keyof Details]) {
          acc.push(key);
        }
        return acc;
      },
      [] as string[],
    ) as (keyof Details)[];

    if (!updatedDetails.length) return;

    await updateDetails(updatedDetails, details, userId);
  }

  const anyDetailNotEmpty = Object.entries(profile.details).some(
    (detail) => detail[1] && detail[0] !== "bio",
  );

  return (
    <div className="bg-primary text-secondary flex max-h-[95dvh] flex-col overflow-y-scroll rounded-md py-4 shadow-3xl">
      <Modal>
        <div className="separator border-b pb-4 text-center text-xl font-bold">
          Edit profile
        </div>
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Profile picture</span>
            <Modal.Open opens="picture">
              <div className="bg-tertiary-hover cursor-pointer rounded-md px-2.5 py-1.5 text-blue-400">
                {profile.picture ? "Edit" : "Add"}
              </div>
            </Modal.Open>
            <Modal.Window name="picture" type="center">
              <ChoosePicture />
            </Modal.Window>
          </div>
          <img
            src={profile.picture}
            alt={profile.firstName}
            className="mx-auto aspect-square w-1/3 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Cover photo</span>
            <Modal.Open opens="cover">
              <div className="bg-tertiary-hover cursor-pointer rounded-md px-2.5 py-1.5 text-blue-400">
                {profile.cover ? "Edit" : "Add"}
              </div>
            </Modal.Open>
            <Modal.Window name="cover" type="center">
              <ChooseCoverSmall />
            </Modal.Window>
          </div>
          {profile.cover ? (
            <img
              src={profile.cover}
              className="mx-auto aspect-video w-2/3 rounded-md object-cover"
            />
          ) : (
            <div className="bg-secondary mx-auto h-[170px] w-5/6 rounded-md"></div>
          )}
        </div>
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Customize your intro</span>
            <Modal.Open opens="details">
              <div className="bg-tertiary-hover cursor-pointer rounded-md px-2.5 py-1.5 text-blue-400">
                Edit
              </div>
            </Modal.Open>
            <Modal.Window name="details" type="center">
              <EditDetails
                details={details}
                setDetails={setDetails}
                handleSave={handleSave}
                handleCancel={() => setDetails(profile.details)}
              />
            </Modal.Window>
          </div>
          <div className="text-tertiary flex flex-col gap-2">
            {anyDetailNotEmpty ? (
              <ProfileDetails details={profile.details} />
            ) : (
              <>
                <div className="flex flex-row items-center gap-2.5">
                  <FaCity className="text-tertiary md:text-2xl" />
                  <span>Current city</span>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <GiTakeMyMoney className="text-tertiary md:text-2xl" />
                  <span>Workplace</span>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <IoSchool className="text-tertiary md:text-2xl" />
                  <span>School</span>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <HiHome className="text-tertiary md:text-2xl" />
                  <span>Hometown</span>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <HiHeart className="text-tertiary md:text-2xl" />
                  <span>Relationship Status</span>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditProfile;
