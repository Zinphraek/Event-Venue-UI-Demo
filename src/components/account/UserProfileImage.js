import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";

/**
 * The component to display a user profile image.
 * @param {string} imageUrl - The props passed to the component.
 * @returns The component to display a user profile image.
 */
const UserProfileImage = ({ imageUrl, userFullName }) => {
  const [selectedImage, setSelectedImage] = useState(
    imageUrl ?? "/assets/images/icon-profile.png"
  );
  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPicture = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="relative w-32 h-32 md:w-96 md:h-96">
      <Avatar
        src={selectedImage}
        alt={userFullName}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <button
        onClick={handleEditPicture}
        className="absolute right-11 bottom-6 rounded-full p-2 cursor-pointer md:right-14 md:bottom-8"
      >
        <img
          src="/assets/icons/image_upload_icon.svg"
          alt="edit"
          className="w-8 h-auto rounded-full"
        />
      </button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
      />
    </div>
  );
};

export default UserProfileImage;
