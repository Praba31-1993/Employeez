"use client";
import React from 'react'
import Upload_document from './upload_document'
import Outlinebutton from '@/app/reusableComponent/outlinebtn'
import { Colors } from '@/app/reusableComponent/styles';

function Edit_personal_info() {
    const useColors = Colors(); // Declare useColors once
    return (
        <div className='dashboardcard px-3 py-4 rounded'>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='First name ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='Middle name ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='Last name ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="email " placeholder='Alternate email id ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='Mobile no ' />
                </div>
                {/* document */}
                <div className="col-12 px-0">
                    <Upload_document />
                </div>
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end gap-3">
                        <Outlinebutton
                            color={useColors.themeRed}
                            border={`1px solid ${useColors.themeRed}`}
                            text="Cancel"
                            fontSize="12px"
                            background={"transparent"}
                            iscontactus={true}
                        />
                        <Outlinebutton
                            color={useColors.white}
                            border={`1px solid ${useColors.themeRed}`}
                            text="Submit"
                            fontSize="12px"
                            background={useColors.themeRed}
                            iscontactus={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit_personal_info
