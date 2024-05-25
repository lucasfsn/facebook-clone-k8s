import { FaHammer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";

function PageNotAvailable() {
  const moveBack = useMoveBack();
  return (
    <div className="bg-secondary fixed flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden">
      <FaHammer className="text-8xl text-blue-500" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-secondary text-xl font-bold">
          This Page Isn't Available Yet
        </h1>
        <p className="text-tertiary max-w-[400px] text-center">
          It may be that the page you are looking for has not been created yet
          or is currently under development.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-lg bg-blue-500 px-8 py-2 text-base font-semibold text-white hover:text-gray-100"
      >
        Go to News Feed
      </Link>
      <button
        onClick={moveBack}
        className="font-semibold text-blue-500 hover:underline"
      >
        Go Back
      </button>
    </div>
  );
}

export default PageNotAvailable;
