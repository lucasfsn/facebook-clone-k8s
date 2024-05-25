interface HomeStoryProps {
  story: {
    storyImage: string;
    profileName: string;
    profilePicture: string;
  };
}

function HomeStory({ story }: HomeStoryProps) {
  const { storyImage, profileName, profilePicture } = story;

  return (
    <div className="bg-primary scale-image relative flex h-[225px] w-[150px] min-w-[150px] cursor-pointer flex-col gap-5 overflow-hidden rounded-xl shadow-md">
      <img
        src={`../../stories/${profilePicture}`}
        alt={profileName}
        className="absolute left-2.5 top-2.5 z-[1] h-[45px] w-[45px] rounded-full border-4 border-blue-700 object-cover"
      />
      <img
        src={`../../stories/${storyImage}`}
        alt="Story"
        className="story h-full rounded-t-xl object-cover object-center"
      />
      <div className="text-shadow absolute bottom-2.5 left-2.5 text-white">
        {profileName}
      </div>
    </div>
  );
}

export default HomeStory;
