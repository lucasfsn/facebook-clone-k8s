import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ImageSlider from "../../ui/ImageSlider";
import Loading from "../../ui/Loading";
import { getUserProfile } from "../profile/profileSlice";
import { getImages, getLoading } from "./imagesSlice";

interface ImagesProfileProps {
  space: number;
  location: "profile" | "photos";
}

function ImagesProfile({ space, location }: ImagesProfileProps) {
  const images = useSelector(getImages);
  const currentProfile = useSelector(getUserProfile);
  const loading = useSelector(getLoading);
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  function handleCloseSlider() {
    setShowSlider(false);
  }

  const profileImages = useMemo(
    () => images.filter((image) => image.owner === currentProfile.username),
    [images, currentProfile.username],
  );

  if (loading) return <Loading />;

  return (
    <div
      className={`grid gap-${space} ${
        location === "profile"
          ? "grid-cols-3 overflow-x-hidden rounded-md"
          : "grid-cols-5"
      }`}
    >
      {showSlider && (
        <ImageSlider
          images={profileImages.map((image) => image.url)}
          close={handleCloseSlider}
          start={selectedImage}
        />
      )}
      {(location === "profile" ? profileImages.slice(0, 9) : profileImages).map(
        (image, index) => (
          <img
            src={image.url}
            key={image.url}
            className={`aspect-square h-full w-full cursor-pointer object-cover ${
              location === "photos" ? "rounded-md" : ""
            }`}
            onClick={() => {
              setShowSlider(true);
              setSelectedImage(index);
            }}
          />
        ),
      )}
    </div>
  );
}

export default ImagesProfile;
