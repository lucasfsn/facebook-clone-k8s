import { useState } from "react";
import { createPortal } from "react-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface ImageSliderProps {
  images: string[];
  close: () => void;
  start?: number;
}

function ImageSlider({ images, close, start = 0 }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(start);

  const { ref } = useOutsideClick(close, true);

  function handleShowPrev() {
    setImageIndex((i) => {
      if (i === 0) return images.length - 1;
      return i - 1;
    });
  }

  function handleShowNext() {
    setImageIndex((i) => {
      if (i === images.length - 1) return 0;
      return i + 1;
    });
  }

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 backdrop-blur-sm">
      <div
        className="absolute left-1/2 top-1/2 h-full w-2/3 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black shadow-2xl"
        ref={ref}
      >
        <div className="flex h-full flex-row overflow-hidden ">
          {images.map((image) => (
            <div
              className="h-full w-full flex-shrink-0 flex-grow-0"
              key={image}
            >
              <img
                key={image}
                src={image}
                className="slider-img aspect-square h-full w-full object-contain"
                style={{ translate: `${-100 * imageIndex}%` }}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={handleShowPrev}
              className="absolute bottom-0 left-0 top-0 w-[50px] bg-black bg-opacity-10 p-1 text-gray-700 transition-transform hover:-translate-x-[0.1rem] hover:text-gray-600"
            >
              <div className="mx-auto flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white bg-opacity-30 p-1.5 shadow-md">
                <MdKeyboardArrowLeft className="text-2xl" />
              </div>
            </button>
            <button
              onClick={handleShowNext}
              className="absolute bottom-0 right-0 top-0 w-[50px] bg-black bg-opacity-10 p-1 text-gray-700 transition-transform hover:translate-x-[0.1rem] hover:text-gray-600"
            >
              <div className="mx-auto flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white bg-opacity-30 p-1.5 shadow-md">
                <MdKeyboardArrowRight className="text-2xl" />
              </div>
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default ImageSlider;
