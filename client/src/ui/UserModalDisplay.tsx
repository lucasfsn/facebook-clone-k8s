import { ChangeEvent, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { DarkModeOptions, useDarkMode } from "../context/DarkModeContext";

interface UserModalDisplayProps {
  handleGoBack: () => void;
}

function UserModalDisplay({ handleGoBack }: UserModalDisplayProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [selectedMode, setSelectedMode] = useState(darkMode);

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value as DarkModeOptions;

    setSelectedMode(selected);
    toggleDarkMode(selected);
  };

  return (
    <div className="bg-primary text-secondary absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] max-w-[350px] flex-col gap-3 rounded-lg p-3 shadow-md">
      <div className="flex items-center gap-2">
        <div
          className="bg-tertiary-hover cursor-pointer rounded-full p-2 text-xl"
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <p className="px-2 text-xl font-bold sm:text-2xl">
          Display & accessibility
        </p>
      </div>
      <div className="flex justify-start gap-2">
        <div className="bg-tertiary h-fit rounded-full p-2 text-xl">
          <IoMdMoon />
        </div>
        <div className="flex flex-col gap-2 text-base">
          <div className="flex flex-col px-2">
            <span className="text-xl font-semibold">Dark mode</span>
            <span className="menu-text text-sm">
              Adjust the appearance of Facebook to reduce glare and give your
              eyes a break.
            </span>
          </div>
          <label className="bg-tertiary-hover flex cursor-pointer justify-between rounded-lg p-2 text-base">
            <span>Off</span>
            <input
              type="radio"
              name="darkmode"
              id="darkmode-off"
              value="off"
              className="scale-150"
              checked={selectedMode === "off"}
              onChange={onOptionChange}
            />
          </label>
          <label className="bg-tertiary-hover flex cursor-pointer justify-between rounded-lg p-2 text-base">
            <span>On</span>
            <input
              type="radio"
              name="darkmode"
              id="darkmode-on"
              value="on"
              className="scale-150"
              checked={selectedMode === "on"}
              onChange={onOptionChange}
            />
          </label>
          <label className="bg-tertiary-hover flex cursor-pointer justify-between rounded-lg p-2 text-base">
            <div className="flex flex-col">
              <span>Automatic</span>
              <span className="menu-text pr-2 text-xs">
                We'll automatically adjust the display based on your device's
                system settings.
              </span>
            </div>
            <input
              type="radio"
              name="darkmode"
              id="darkmode-auto"
              value="auto"
              className="scale-150"
              checked={selectedMode === "auto"}
              onChange={onOptionChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default UserModalDisplay;
