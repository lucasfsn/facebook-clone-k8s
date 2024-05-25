import { useSelector } from "react-redux";
import UserSettings from "../features/settings/UserSettings";
import { getUser } from "../features/user/userSlice";
import { useMoveBack } from "../hooks/useMoveBack";

function Settings() {
  const user = useSelector(getUser);
  const moveBack = useMoveBack();

  return (
    <div className="text-secondary flex h-[calc(100dvh_-65px)] w-full flex-col justify-between gap-10 self-start p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-semibold">
          Hello, {user?.firstName}!
        </span>
        <span className="text-2xl font-semibold">
          Here you can easily edit your settings 😊
        </span>
      </div>
      <UserSettings />
      <button
        onClick={moveBack}
        className="self-start font-semibold text-blue-500 hover:underline"
      >
        Go Back
      </button>
    </div>
  );
}

export default Settings;
