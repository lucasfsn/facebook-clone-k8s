import { ReactElement, useReducer } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { home } from "../../../data/home";
import { SHOW_LIMIT } from "../../utils/constants";
import { getUser } from "../user/userSlice";
import HomeMenuItem from "./HomeMenuItem";

interface State {
  limit: number;
  text: string;
  icon: ReactElement;
}

interface Action {
  type: "menu/toggle";
}

const initialState = {
  limit: SHOW_LIMIT,
  text: "See more",
  icon: <MdKeyboardArrowDown />,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "menu/toggle":
      return {
        ...state,
        limit: state.limit === SHOW_LIMIT ? home.length - 1 : SHOW_LIMIT,
        text: state.text === "See more" ? "See less" : "See more",
        icon:
          state.text === "See more" ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdKeyboardArrowDown />
          ),
      };
    default:
      return state;
  }
}

function HomeMenu() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useSelector(getUser);

  return (
    <div className="text-secondary separator sticky top-[55px] col-start-1 col-end-2 hidden h-fit max-h-[calc(100dvh_-90px)] min-w-[275px] overflow-y-scroll border-b pb-2 lg:block">
      <Link
        to="/profile"
        className="bg-tertiary-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2"
      >
        <img
          src={user?.picture}
          alt="Profile picture"
          className="relative flex h-[30px] w-[30px] min-w-[30px] rounded-full"
        />
        <span className="text-base">
          {user?.firstName} {user?.lastName}
        </span>
      </Link>
      {home.slice(0, state.limit).map((item) => (
        <HomeMenuItem key={item.name} item={item} />
      ))}
      <div
        className="bg-tertiary-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2"
        onClick={() => dispatch({ type: "menu/toggle" })}
      >
        <div className="bg-tertiary flex h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-full text-2xl">
          {state.icon}
        </div>
        <span className="text-base">{state.text}</span>
      </div>
    </div>
  );
}

export default HomeMenu;
