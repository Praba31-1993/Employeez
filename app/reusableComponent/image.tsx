import React from "react";
import Image from "next/image";

interface ImageComponentProps {
  user?: any | null; // user can be a string (URL) or null/undefined
  width?: number;
  height?: number;
}

const ImageComponent = ({ user, width, height }: ImageComponentProps) => {
  const imageUrl = user || "/assets/img/avatarblack.svg"; // Fallback to the default image if 'user' is not provided

  return (
    <Image
      src={imageUrl}
      alt="User Profile"
      width={width != 0 ? width : 40}
      height={height != 0 ? height : 40}
      onError={(e) => (e.currentTarget.src = "/assets/img/avatarblack.svg")}
    />
  );
};

export default ImageComponent;
