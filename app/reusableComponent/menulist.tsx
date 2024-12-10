import React from 'react'
import Image from 'next/image'
import { Avatar } from '@mui/material'
import user2 from "@/app/assets/img/user2.svg";
function Menulistitem() {
    return (
        <>
            <div className="approverlist  align-items-center d-flex mt-2">
                <div className="userimages">
                    <Image className="" src={user2} alt={""} />
                </div>
                <div className="roles ps-2">
                    <h5 className="para textheader  mb-0 ">Timesheet approver</h5>
                    <p className="para2 mb-0 mt-1 shade">Timesheet approver</p>
                </div>
            </div></>
    )
}

export default Menulistitem
