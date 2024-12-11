import React from "react";
import Image from "next/image";

interface ImageComponentProps {
  user?: any | null;  // user can be a string (URL) or null/undefined
}

const ImageComponent: React.FC<ImageComponentProps> = ({ user }) => {
  const imageUrl = user || "/assets/img/default-Group 9244.svg"; // Fallback to the default image if 'user' is not provided

  return (
    <Image
      src={imageUrl}
      alt="User Profile"
      width={50}
      height={50}
      onError={(e) => (e.currentTarget.src = "/assets/img/default-Group 9244.svg")} // Set fallback image if the src fails
    />
  );
};

export default ImageComponent;
