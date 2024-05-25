interface HomeMenuItemProps {
  item: {
    name: string;
    icon: string;
  };
}

function HomeMenuItem({ item }: HomeMenuItemProps) {
  return (
    <div className="bg-tertiary-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2">
      <img
        src={`../../icons/${item.icon}.png`}
        alt="Menu Item"
        className="relative flex h-[30px] w-[30px] min-w-[30px] rounded-full"
      />
      <span className="text-base">{item.name}</span>
    </div>
  );
}

export default HomeMenuItem;
