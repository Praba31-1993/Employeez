import React from 'react'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

function Work_status() {
  return (
    <div>
      <div className='dashboardcard rounded py-3 mt-3'>
            <div className="row">
                <div className="col-12  mb-3">
                    <h2 className="heading2 textheader">Work status</h2>
                </div>
                <div className="col-12">
                    <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <BusinessCenterOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Work status </p>
                    <p className="para2 mt-1 dropdowncolor fw-bold">H1B1</p>
                </div>
                <div className="col-12">
                    <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <DateRangeOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Work status expiry </p>
                    <p className="para2 mt-1 dropdowncolor fw-bold">10/19/2025</p>
                </div>
                <div className="col-12">
                    <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <BadgeOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Driving license no </p>
                    <p className="para2 mt-1 dropdowncolor fw-bold">HA25167281</p>
                </div>
                <div className="col-12">
                    <p className="para mb-0 unselectcolor" style={{ alignSelf: "center" }}> <BadgeOutlinedIcon className='me-1' sx={{ fontSize: "20px" }} />Driving license expiry date </p>
                    <p className="para2 mt-1 dropdowncolor fw-bold">10/11/2025</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Work_status
