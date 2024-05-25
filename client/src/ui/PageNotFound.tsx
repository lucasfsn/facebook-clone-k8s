import { GiBreakingChain } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="fixed flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-gray-100">
      <GiBreakingChain className="rotate-90 text-8xl" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold text-gray-500">
          This Page Isn't Available
        </h1>
        <p className="max-w-[400px] text-center text-gray-500">
          The link may be broken, or the page may have been removed. Check to
          see if the link you're trying to open is correct.
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

export default PageNotFound;
