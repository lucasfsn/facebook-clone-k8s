import { BiSolidMoviePlay } from "react-icons/bi";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaBookOpen, FaFlag, FaShoppingBag, FaStar } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import { PiCoinFill } from "react-icons/pi";

export const menu = [
  {
    title: "Social",
    items: [
      {
        name: "Events",
        description:
          "Organize or find events and other things to do online and nearby.",
        icon: "events",
      },
      {
        name: "Find friends",
        description: "Search for friends or people you may know.",
        icon: "find-friends",
      },
      {
        name: "Groups",
        description: "Connect with people who share your interests.",
        icon: "groups",
      },
      {
        name: "News Feed",
        description: "See relevant posts from people and Pages you follow.",
        icon: "news-feed",
      },
      {
        name: "Feeds",
        description:
          "See the most recent posts from your friends, groups, Pages and more.",
        icon: "feeds",
      },
      {
        name: "Pages",
        description: "Discover and connect with businesses on Facebook.",
        icon: "pages",
      },
    ],
  },
  {
    title: "Entertainment",
    items: [
      {
        name: "Gaming Video",
        description:
          "Watch and connect with your favourite games and streamers.",
        icon: "gaming-video",
      },
      {
        name: "Play Games",
        description: "Play your favourite games.",
        icon: "play-games",
      },
      {
        name: "Video",
        description:
          "A video destination personalized to your interests and connections.",
        icon: "video",
      },
    ],
  },
  {
    title: "Shopping",
    items: [
      {
        name: "Orders and payments",
        description:
          "A seamless, securfe way to pay on the apps you already use.",
        icon: "orders-and-payments",
      },
      {
        name: "Marketplace",
        description: "Buy and sell in your community.",
        icon: "marketplace",
      },
    ],
  },
  {
    title: "Personal",
    items: [
      {
        name: "Recent ad activity",
        description: "See all the ads you interacted with on Facebook.",
        icon: "recent-ad-activity",
      },
      {
        name: "Memories",
        description: "Browse your old photos, videos and posts on Facebook.",
        icon: "memories",
      },
      {
        name: "Saved",
        description: "Find posts, photos and videos thay you saved for later.",
        icon: "saved",
      },
    ],
  },
  {
    title: "Professional",
    items: [
      {
        name: "Ads Manager",
        description: "Create, manage and track the performance of your ads.",
        icon: "ads-manager",
      },
    ],
  },
  {
    title: "Community Resources",
    items: [
      {
        name: "Climate Science Center",
        description: "Learn about climate change and its effects.",
        icon: "climate-science-center",
      },
      {
        name: "Fundraisers",
        description:
          "Donate and raise money for nonprofits and personal causes.",
        icon: "fundraisers",
      },
    ],
  },
  {
    title: "More from Meta",
    items: [
      {
        name: "Meta Quest",
        description: "Meta Quest 3 is now here!",
        icon: "meta-quest",
      },
    ],
  },
];

export const menuRight = [
  {
    id: 0,
    items: [
      {
        name: "Post",
        icon: <FaRegPenToSquare />,
      },
      {
        name: "Story",
        icon: <FaBookOpen />,
      },
      {
        name: "Reel",
        icon: <BiSolidMoviePlay />,
      },
      {
        name: "Life event",
        icon: <FaStar />,
      },
    ],
  },
  {
    id: 1,
    items: [
      {
        name: "Page",
        icon: <FaFlag />,
      },
      {
        name: "Ad",
        icon: <HiSpeakerphone />,
      },
      {
        name: "Group",
        icon: <MdGroups />,
      },
      {
        name: "Event",
        icon: <BsCalendar2EventFill />,
      },
      {
        name: "Marketplace listing",
        icon: <FaShoppingBag />,
      },
      {
        name: "Fundraiser",
        icon: <PiCoinFill />,
      },
    ],
  },
];
