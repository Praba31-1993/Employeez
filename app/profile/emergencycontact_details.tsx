import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FlagCircleOutlinedIcon from '@mui/icons-material/FlagCircleOutlined';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';

function Emergencycontact_details() {
  return (
    <div className='dashboardcard rounded py-3 mt-3'>
    <div className="row">
        <div className="col-12  mb-3">
            <h2 className="heading2 textheader">Work site</h2>
        </div>
        <div className="col-md-6">
            <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <PersonOutlineOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Contact person </p>
            <p className="para2 mt-1 dropdowncolor fw-bold">Lynn</p>
        </div>
        <div className="col-md-6">
            <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <FamilyRestroomOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Realtionship </p>
            <p className="para2 mt-1 dropdowncolor fw-bold">Father</p>
        </div>
        <div className="col-12">
            <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <PhoneOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Mobile no </p>
            <p className="para2 mt-1 dropdowncolor fw-bold">+1 625380161</p>
        </div>
        <div className="col-md-6">
            <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <HouseOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Address </p>
            <p className="para2 mt-1 dropdowncolor fw-bold">892 carl str</p>
        </div>
        <div className="col-md-6">
            <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <PublicOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />City </p>
            <p className="para2 mt-1 dropdowncolor fw-bold">Novi</p>
        </div>
        <div className="col-md-6">
            <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <ExploreOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />State </p>
            <p className="para2 mt-1 dropdowncolor fw-bold">Louisiana</p>
        </div>
        <div className="col-md-6">
            <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <FlagCircleOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Country </p>
            <p className="para2 mt-1 dropdowncolor fw-bold">bill@United states of america</p>
        </div>
        <div className="col-12">
            <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <MarkAsUnreadOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Postal code</p>
            <p className="para2 mt-1 dropdowncolor fw-bold">42361</p>
        </div>
    </div>
</div>
  )
}

export default Emergencycontact_details
