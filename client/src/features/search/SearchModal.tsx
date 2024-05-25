import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { HiArrowLeft, HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AppDispatch } from "../../store";
import Loading from "../../ui/Loading";
import { getUserId } from "../user/userSlice";
import SearchBar from "./SearchBar";
import { getLoading, getSearch, getSearchHistory } from "./searchSlice";
import { useSearchHistory } from "./useSearchHistory";
import { useSearchResults } from "./useSearchResults";

interface SearchModalProps {
  setShowSearchPanel: Dispatch<SetStateAction<boolean>>;
}

function SearchModal({ setShowSearchPanel }: SearchModalProps) {
  const dispatch: AppDispatch = useDispatch();

  const [showIcon, setShowIcon] = useState(true);

  const { addSearchHistory, deleteSearchHistory } = useSearchHistory();
  const { setResults } = useSearchResults();

  const search = useSelector(getSearch);
  const loading = useSelector(getLoading);
  const id = useSelector(getUserId);

  const input = useRef<HTMLInputElement>(null);

  function close() {
    setShowSearchPanel(false);
    setResults([]);
  }

  const { ref } = useOutsideClick(close);

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    if (id) dispatch(getSearchHistory(id));
  }, [dispatch, id]);

  async function handleAddToSearchHistory(resultUserId: string) {
    if (!id) return;

    close();

    await addSearchHistory(resultUserId, id);
  }

  async function handleDeleteFromSearchHistory(resultUserId: string) {
    if (!id) return;

    await deleteSearchHistory(resultUserId, id);
  }

  return (
    <div
      ref={ref}
      className="bg-primary absolute left-0 top-0 z-50 flex w-[310px] flex-col justify-center gap-2 rounded-b-lg p-2 shadow-md"
    >
      <div className="flex flex-row gap-2">
        <button
          className="bg-tertiary-hover flex h-[40px] min-w-[40px] items-center justify-center rounded-full"
          onClick={close}
        >
          <HiArrowLeft className="text-secondary text-xl" />
        </button>
        <SearchBar
          placeholder="Search Facebook"
          showIcon={showIcon}
          setShowIcon={setShowIcon}
          full={true}
          input={input}
        />
      </div>
      {loading === "fulfilled" &&
        search.results.length === 0 &&
        search.history.length === 0 && (
          <div className="self-center py-2 text-gray-500">
            No recent searches
          </div>
        )}
      {search.history.length !== 0 && search.results.length === 0 && (
        <div className="flex max-h-[50dvh] flex-col gap-1 overflow-y-scroll">
          <span className="text-secondary px-2 py-1 text-lg font-semibold">
            Recent searches
          </span>
          {loading === "pending" ? (
            <Loading />
          ) : (
            <div className="flex flex-col">
              {search.history.map((result) => (
                <div
                  className="bg-tertiary-hover flex items-center rounded-md p-2"
                  key={result.user._id}
                >
                  <Link
                    to={`/profile/${result.user.username}`}
                    className="flex flex-grow items-center justify-between"
                    onClick={() => handleAddToSearchHistory(result.user._id)}
                  >
                    <div className="text-secondary flex items-center gap-3">
                      <img
                        src={result.user.picture}
                        alt={result.user.username}
                        className="aspect-square w-[35px] rounded-full"
                      />
                      <span>
                        {result.user.firstName} {result.user.lastName}
                      </span>
                    </div>
                  </Link>
                  <div
                    className="bg-tertiary-hover cursor-pointer rounded-full p-1.5 hover:brightness-125"
                    onClick={async () =>
                      await handleDeleteFromSearchHistory(result.user._id)
                    }
                  >
                    <HiXMark className="text-tertiary text-lg" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="max-h-[50dvh] overflow-y-scroll">
        {search.results.map((result) => (
          <Link
            to={`/profile/${result.username}`}
            className="bg-tertiary-hover text-secondary flex items-center gap-3 rounded-md p-2"
            onClick={() => handleAddToSearchHistory(result._id)}
            key={result._id}
          >
            <img
              src={result.picture}
              alt={result.username}
              className="aspect-square w-[35px] rounded-full"
            />
            <span>
              {result.firstName} {result.lastName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchModal;
