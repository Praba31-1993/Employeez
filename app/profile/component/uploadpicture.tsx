"use client";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Colors } from "../../reusableComponent/styles";
import Outlinebutton from "../../reusableComponent/outlinebtn";
import Image from "next/image";

export default function Uploadpicture({ show, close }: any) {
  const useColors = Colors();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB. Please select a smaller file.");
        return;
      }

      // Show image preview
      const fileUrl = URL.createObjectURL(file);
      setSelectedImage(fileUrl);
    }
  };

  return (
    <section
      className={`showpopup ${show ? "showpopupactive" : ""}`}
      onClick={close}
    >
      <div
        className="summarysection py-3 rounded mx-auto"
        style={{
          height: "fit-content",
          alignSelf: "center",
          width: "600px",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-6" style={{ alignSelf: "center" }}>
              <h6 className="textheader para">Upload profile picture</h6>
            </div>
            <div className="col-6 text-end">
              <FontAwesomeIcon
                className="my-2 textheader"
                style={{ cursor: "pointer" }}
                icon={faXmark}
                onClick={close}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {/* Button to trigger file input */}
              <Outlinebutton
                color={useColors.themeRed}
                border={`1px solid ${useColors.themeRed}`}
                text="Choose file"
                fontSize="12px"
                background={"transparent"}
                iscontactus={true}
                onClick={() => fileInputRef.current?.click()} // Trigger file input
              />
            </div>

            {selectedImage && (
              <>
                <div className="col-12 text-center mt-3">
                  <Image
                    src={selectedImage}
                    alt="Selected"
                    width={100}
                    height={100}
                  />
                </div>
              </>
            )}

            <div className="col-12">
              <p className="para2 mt-2" style={{ color: useColors.themeRed }}>
                *Supported files: JPEG, JPG, PNG. Max size: 2MB
              </p>
            </div>
            {selectedImage && (
              <>
                <div className="col-12 d-flex justify-content-end">
                  <Outlinebutton
                    color={useColors.white}
                    border={`1px solid ${useColors.themeRed}`}
                    text="Upload"
                    fontSize="12px"
                    background={useColors.themeRed}
                    iscontactus={true}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
