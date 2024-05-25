import HomeContacts from "../features/home/HomeContacts";
import HomeMain from "../features/home/HomeMain";
import HomeMenu from "../features/home/HomeMenu";

function Home() {
  return (
    <div className="flex w-full flex-row justify-between gap-3">
      <HomeMenu />
      <HomeMain />
      <HomeContacts />
    </div>
  );
}

export default Home;
