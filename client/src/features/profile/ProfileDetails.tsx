import { BiSolidBusSchool } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiHeart, HiHome } from "react-icons/hi2";
import { IoSchool } from "react-icons/io5";
import { Details } from "../../types/profile";

interface DetailsProps {
  details: Details;
}

function ProfileDetails({ details }: DetailsProps) {
  return (
    <>
      {details.currentCity && (
        <div className="flex flex-row items-center gap-2.5">
          <FaCity className="text-tertiary md:text-2xl" />
          <span>Lives in {details.currentCity}</span>
        </div>
      )}
      {details.hometown && (
        <div className="flex flex-row items-center gap-2.5">
          <HiHome className="text-tertiary md:text-2xl" />
          <span>From {details.hometown}</span>
        </div>
      )}
      {details.highschool && (
        <div className="flex flex-row items-center gap-2.5">
          <BiSolidBusSchool className="text-tertiary md:text-2xl" />
          <span>Studied at {details.highschool}</span>
        </div>
      )}
      {details.college && (
        <div className="flex flex-row items-center gap-2.5">
          <IoSchool className="text-tertiary md:text-2xl" />
          <span>Studied at {details.college}</span>
        </div>
      )}
      {details.relationship && (
        <div className="flex flex-row items-center gap-2.5">
          <HiHeart className="text-tertiary md:text-2xl" />
          <span>{details.relationship}</span>
        </div>
      )}
      {details.workplace && (
        <div className="flex flex-row items-center gap-2.5">
          <GiTakeMyMoney className="text-tertiary md:text-2xl" />
          <span>Works at {details.workplace}</span>
        </div>
      )}
    </>
  );
}

export default ProfileDetails;
