import Default from "@/public/assets/img/default.svg";
import Border from "@/public/assets/img/border.svg";

import { Colors } from "../styles";
import Image from "next/image";
import { setColor } from "@/app/redux/slices/colorSlice";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ImageComponent from "../image";

export function Skincustomization() {
  const useColors = Colors(); // Fetch theme colors
  const dispatch = useDispatch();

  // Redux selectors for border and shadow
  const selectedborder = useSelector((state: RootState) => state.color.border);
  const selectedshadow = useSelector((state: RootState) => state.color.shadow);

  // Function to update border and shadow
  const handleSelectStyle = (border: string, shadow: string) => {
    dispatch(setColor({ border, shadow }));
  };

  useEffect(() => {}, [selectedborder, selectedshadow]);

  return (
    <div className="col-12 mt-2">
      <h5 className="para mb-0">Skin</h5>
      <div
        className="d-flex ps-1 mt-2 align-items-center skin"
        style={{ gap: "10px" }}
      >
        {/* Default Style */}
        <div
          onClick={() =>
            handleSelectStyle("0px", "0px 2px 4px 0px rgba(0, 0, 0, 0.05)")
          }
        >
          {/* <Image
                        src={"/assets/img/default.svg"}
                        width={0}
                        alt="Default"
                        className={`skin-option ${selectedborder === "0px" ? "active" : ""}`}
                        style={{
                            transition: "border 0.3s ease",
                            border: selectedborder === "0px" ? `2px solid ${useColors.themeRed}` : "2px solid transparent",
                        }}
                    /> */}
          <div
            className={`skin-option ${
              selectedborder === "0px" ? "active" : ""
            }`}
            style={{
              transition: "border 0.3s ease",
              border:
                selectedborder === "0px"
                  ? `2px solid ${useColors.themeRed}`
                  : "2px solid transparent",
            }}
          >
            <Image className="p-1" src={Default} alt="default" />
          </div>
          <p className="mb-0 py-1 shade" style={{ fontSize: "10px" }}>
            Default
          </p>
        </div>

        {/* Border Style */}
        <div onClick={() => handleSelectStyle("0.5px solid #CCC", "unset")}>
          {/* <Image
            src={"/assets/img/border.svg"}
            alt="Border"
            className={`skin-option ${
              selectedborder === "0.5px solid #CCC" ? "active" : ""
            }`}
            style={{
              transition: "border 0.3s ease",
              border:
                selectedborder === "0.5px solid #CCC"
                  ? `2px solid ${useColors.themeRed}`
                  : " 2px solid transparent",
            }}
          /> */}

          <div
            className={`skin-option ${
              selectedborder === "0.5px solid #CCC" ? "active" : ""
            }`}
            style={{
              transition: "border 0.3s ease",
              border:
                selectedborder === "0.5px solid #CCC"
                  ? `2px solid ${useColors.themeRed}`
                  : " 2px solid transparent",
            }}
          >
            {/* <ImageComponent width={0}  height={0} user={"/assets/img/border.svg"} /> */}
            <Image className="p-1" src={Border} alt="Border" />
          </div>
          <p className="mb-0 py-1 shade" style={{ fontSize: "10px" }}>
            Border
          </p>
        </div>
      </div>
    </div>
  );
}
