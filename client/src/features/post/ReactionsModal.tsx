import { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { reactions as reactionsGif } from "../../../data/reactions";
import { ReactionType } from "../../types/posts";
import { capitalize } from "../../utils/helpers";

interface ReactionsModalProps {
  setActiveLike: Dispatch<SetStateAction<boolean>>;
  handleAddReaction: (reaction: ReactionType) => Promise<void>;
}

const ReactionsModal = forwardRef<HTMLDivElement, ReactionsModalProps>(
  ({ setActiveLike, handleAddReaction }, ref) => {
    const [activeReaction, setActiveReaction] = useState<string | null>(null);

    return (
      <div
        ref={ref}
        className="bg-secondary absolute -top-[130%] z-50 flex flex-row gap-2 rounded-full p-1 shadow-3xl"
        onMouseEnter={() => {
          setTimeout(() => {
            setActiveLike(true);
          }, 800);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setActiveLike(false);
          }, 800);
        }}
      >
        {reactionsGif.map((r) => (
          <div
            key={r.id}
            className="relative cursor-pointer"
            onMouseEnter={() => setActiveReaction(r.name)}
            onMouseLeave={() => setActiveReaction(null)}
          >
            {activeReaction === r.name && (
              <span className="absolute -top-8 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-black bg-opacity-70 px-1.5 text-sm font-semibold text-white">
                {capitalize(r.name)}
              </span>
            )}
            <img
              src={r.reaction}
              alt={r.name}
              className="max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px] rounded-full transition-all hover:-translate-y-1.5 hover:scale-[1.2]"
              onClick={() => handleAddReaction(r.name as ReactionType)}
            />
          </div>
        ))}
      </div>
    );
  },
);

export default ReactionsModal;
