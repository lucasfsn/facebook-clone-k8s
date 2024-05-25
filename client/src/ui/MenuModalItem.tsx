interface MenuModalItemProps {
  item: {
    name: string;
    description: string;
    icon: string;
  };
}

function MenuModalItem({ item }: MenuModalItemProps) {
  return (
    <li className="bg-tertiary-hover flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-2">
      <img
        src={`../../icons/${item.icon}.png`}
        alt={item.name}
        className="h-8 w-8"
      />
      <div className="self-start">
        <h3 className="text-secondary text-base">{item.name}</h3>
        <p className="menu-text text-sm leading-4">{item.description}</p>
      </div>
    </li>
  );
}

export default MenuModalItem;
