import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import bag from "/assets/img/carry_on_bag.png";
import ImageComponent from "../reusableComponent/image";

export default function Summarycards({ leaveData, leaveTypeimages }: any) {
  return (
    <>
      <div className="summarydetailscards  ps-3 py-2">
        <div className="d-flex align-items-center">
          <div className="p-1 icons">
            {/* <Image src={bag} alt={""} width={"50"} height={"50"} /> */}
            {/* <Avatar src="" alt="Remy Sharp" /> */}
            <ImageComponent width={0}  height={0} user={"/assets/img/lock.png"} />

            
          </div>

          <p className="para ms-3 mb-0 textheader">
            {leaveData?.codeLabel || leaveData?.projId}
          </p>
        </div>
        <h5 className="mt-3  textheader mb-0">{leaveData?.totalValue}</h5>
      </div>
    </>
  );
}
