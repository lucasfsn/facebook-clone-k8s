import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { SearchUser } from "../../types/search";
import { getUserProfile } from "../profile/profileSlice";
import { useSearchResults } from "./useSearchResults";

interface SearchBarProps {
  placeholder: string;
  showIcon?: boolean;
  setShowIcon?: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
  full?: boolean;
  input?: RefObject<HTMLInputElement>;
  filterFriends?: boolean;
  setContactsResults?: Dispatch<SetStateAction<SearchUser[]>>;
}

function SearchBar({
  placeholder,
  showIcon = true,
  setShowIcon = () => {},
  onClick,
  full = false,
  input,
  filterFriends = false,
  setContactsResults = () => {},
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const profile = useSelector(getUserProfile);
  const { getResults, setResults } = useSearchResults();

  async function handleSearch() {
    if (!searchValue || searchValue.length <= 2) {
      setResults([]);
      setContactsResults?.([]);
      return;
    }

    const data = await getResults(searchValue);

    if (!filterFriends) return setResults(data);

    const filteredFriends = data.filter((res: SearchUser) =>
      profile.friends.find((friend) => friend._id === res._id),
    );

    setContactsResults(filteredFriends);
  }

  return (
    <div
      onClick={onClick}
      className={`bg-tertiary flex h-[40px] min-w-[40px] cursor-text items-center justify-start gap-2 overflow-hidden rounded-full px-3 py-1 ${
        showIcon ? "cursor-default" : ""
      }`}
    >
      {showIcon && <HiMagnifyingGlass className="text-md text-secondary" />}
      <input
        className={`bg-tertiary text-secondary border-none text-base outline-none lg:block ${
          full ? "" : "hidden"
        }`}
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleSearch}
        onFocus={() => setShowIcon(false)}
        onBlur={() => setShowIcon(true)}
        ref={input}
      />
    </div>
  );
}

export default SearchBar;
