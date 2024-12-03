import * as React from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
export default function Listicon({ text, remove }: any) {
  

  return (
    <div
      className="timesheetdetails justify-content-between align-items-center d-flex my-1 py-2"
    >
      <div className="d-flex align-items-center">
        <DescriptionOutlinedIcon sx={{ color: "#8C57FF" }} />
        <p className="para ps-3 mb-0 textheader">{text}</p>
      </div>
      <CancelOutlinedIcon sx={{ color: "#FF7777", cursor: "pointer" }}  onClick={remove}/>
    </div>
  );
}
