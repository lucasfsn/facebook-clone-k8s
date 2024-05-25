import { menu, menuRight } from "../../data/menu";
import MenuModalItem from "./MenuModalItem";

function MenuModal() {
  return (
    <div className="bg-tertiary absolute right-[15px] top-[50px] z-50 flex max-h-[90vh] flex-col gap-3 rounded-lg p-3 shadow-md">
      <h1 className="text-secondary text-2xl font-bold">Menu</h1>
      <div className="flex flex-row gap-3 overflow-y-scroll">
        <div className="bg-primary flex max-w-md flex-col gap-3 overflow-y-scroll rounded-lg px-4 py-3 shadow-sm">
          {menu.map(({ title, items }, i) => (
            <ul
              key={title}
              className={`flex flex-col pb-3 ${
                i === menu.length - 1 ? "" : "separator border-b"
              }`}
            >
              <h2 className="text-secondary text-lg font-semibold">{title}</h2>
              {items.map((item) => (
                <MenuModalItem item={item} key={item.name} />
              ))}
            </ul>
          ))}
        </div>
        <div className="bg-primary overflow-y-scroll rounded-lg px-4 py-3 shadow-sm">
          <h2 className="text-secondary text-xl font-bold">Create</h2>
          <div>
            {menuRight.map(({ id, items }, i) => (
              <ul
                key={id}
                className={`flex flex-col py-3 text-base ${
                  i === menuRight.length - 1 ? "" : "separator border-b"
                }`}
              >
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="bg-tertiary-hover flex cursor-pointer flex-row items-center gap-2 rounded-lg p-2"
                  >
                    <div className="text-secondary text-secondary bg-tertiary flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full text-lg">
                      {item.icon}
                    </div>
                    <span className="text-secondary">{item.name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
