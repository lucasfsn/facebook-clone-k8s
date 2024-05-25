import { useState } from "react";
import { FaGlobeEurope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Details } from "../../types/profile";
import Modal from "../../ui/Modal";
import { getUserId } from "../user/userSlice";
import EditDetails from "./EditDetails";
import ProfileDetails from "./ProfileDetails";
import { getProfileDetails } from "./profileSlice";
import { useDetails } from "./useDetails";

interface ProfileIntroProps {
  isProfileOwner: boolean;
}

function ProfilePanelIntro({ isProfileOwner }: ProfileIntroProps) {
  const profileDetails = useSelector(getProfileDetails);
  const userId = useSelector(getUserId);

  const [details, setDetails] = useState<Details>(profileDetails);
  const [showBio, setShowBio] = useState<boolean>(false);

  const { updateDetails } = useDetails();

  async function handleSave() {
    if (!userId) return;

    const updatedDetails = Object.entries(details).reduce(
      (acc, [key, value]) => {
        if (value !== profileDetails[key as keyof Details]) {
          acc.push(key);
        }
        return acc;
      },
      [] as string[],
    ) as (keyof Details)[];

    if (!updatedDetails.length) return;

    await updateDetails(updatedDetails, details, userId);
  }

  return (
    <div className="bg-primary flex flex-col gap-3 rounded-md px-4 py-2">
      <p className="text-xl font-bold">Intro</p>
      <div className="text-secondary flex flex-col gap-2.5">
        {showBio && isProfileOwner && (
          <div className="flex flex-col">
            <textarea
              value={details.bio}
              placeholder="Describe who you are"
              onChange={(e) => setDetails({ ...details, bio: e.target.value })}
              className="bg-tertiary resize-none rounded-md p-1.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-800"
              maxLength={101}
            />
            <span className="text-tertiary self-end text-sm">
              {101 - (details.bio?.length ?? 0)} characters remaining
            </span>
            <div className="flex justify-between pt-1">
              <div className="text-secondary flex items-center gap-2">
                <FaGlobeEurope className="text-xl" />
                <span>Public</span>
              </div>
              <div className="flex gap-1">
                <button
                  className="bg-tertiary bg-tertiary-hover rounded-md px-2.5 py-1.5 font-semibold"
                  onClick={() => {
                    setDetails({ ...details, bio: profileDetails.bio });
                    setShowBio(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-blue-500 px-2.5 py-1.5 font-semibold text-white hover:bg-blue-400"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {!showBio && <p className="text-center">{profileDetails.bio}</p>}
        {!showBio && isProfileOwner && (
          <button
            className="bg-tertiary bg-tertiary-hover w-full rounded-md p-1.5"
            onClick={() => setShowBio(true)}
          >
            {details.bio ? "Edit bio" : "Add bio"}
          </button>
        )}
        <ProfileDetails details={profileDetails} />
        {isProfileOwner && (
          <Modal>
            <Modal.Open opens="details">
              <button className="bg-tertiary bg-tertiary-hover w-full rounded-md p-1.5">
                Edit details
              </button>
            </Modal.Open>
            <Modal.Window name="details" type="center">
              <EditDetails
                details={details}
                setDetails={setDetails}
                handleSave={handleSave}
                handleCancel={() => setDetails(profileDetails)}
              />
            </Modal.Window>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ProfilePanelIntro;
