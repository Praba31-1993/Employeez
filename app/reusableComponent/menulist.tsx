import React from 'react'
import Image from 'next/image'
import { Avatar } from '@mui/material'
function Menulistitem() {
  return (
    <>
    <div className="approverlist  align-items-center d-flex mt-2">
              <div style={{ width: "35px", height: "35px" }}>
              <Avatar src="" alt="Remy Sharp" />
              </div>

              {/* <Avatar src='' /> */}
              <div className="roles">
                  <h5 className="para ps-2 mb-0 ">Timesheet approver</h5>
                  <p className="para2 ps-2 mb-0 mt-1 shade">Timesheet approver</p>
              </div>
          </div></>
  )
}

export default Menulistitem
