import { useState } from "react";
import { SinglePost } from "../../types/posts";
import ImageSlider from "../../ui/ImageSlider";

interface ImagesPostProps {
  post: {
    images: SinglePost["images"];
    type: SinglePost["type"];
    user?: SinglePost["user"];
  };
  enableSlider?: boolean;
}

function ImagesPost({ post, enableSlider = true }: ImagesPostProps) {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  function handleCloseSlider() {
    setShowSlider(false);
  }

  return (
    <>
      {enableSlider && showSlider && (
        <ImageSlider
          images={post.images}
          close={handleCloseSlider}
          start={selectedImage}
        />
      )}
      <div className="grid grid-cols-6 gap-0.5 overflow-x-hidden">
        {post.images.slice(0, 5).map((img, index) => (
          <div
            key={img}
            className={`relative ${
              post.images.length >= 5
                ? index < 2
                  ? "col-span-3"
                  : "col-span-2"
                : post.images.length % 2 !== 0 && index === 0
                ? "col-span-6"
                : "col-span-3"
            } ${post.type === "profile" ? "profile-post" : ""}`}
            style={
              post.user?.cover && post.type === "profile"
                ? {
                    backgroundImage: `url(${post.user.cover})`,
                    height: "50%",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            <img
              src={img}
              className={`cursor-pointer object-cover ${
                post.type === "cover"
                  ? "aspect-video h-full w-full"
                  : post.type === "profile"
                  ? "mx-auto aspect-square w-2/3 rounded-full"
                  : "aspect-square h-full w-full"
              }`}
              onClick={() => {
                setShowSlider(true);
                setSelectedImage(index);
              }}
            />
            {index === 4 && post.images.length > 5 && (
              <div
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 text-3xl font-semibold text-white hover:bg-opacity-[0.45]"
                onClick={() => {
                  setShowSlider(true);
                  setSelectedImage(index);
                }}
              >
                +{post.images.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ImagesPost;
