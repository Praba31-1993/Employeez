"use client";
import React from 'react'
import Upload_document from './upload_document'
import Outlinebutton from '@/app/reusableComponent/outlinebtn'
import { Colors } from '@/app/reusableComponent/styles';

function Emergency_contact({ selectedOption, setSelectedOption }: any) {
    const useColors = Colors(); // Declare useColors once
    return (
        <div className='dashboardcard px-3 py-4 rounded'>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <select className="selectborder textheader py-2 w-100 rounded px-2"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="2">Emergency address</option>
                        <option value="1">Personal address</option>
                        <option value="3">Work address</option>
                    </select>
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='Contact person ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='Relationship* ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='Mobile no ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='Address ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='City ' />
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="text " placeholder='State ' />
                </div>
                <div className="col-md-3 mb-3">
                    <select className='selectborder textheader py-2 w-100 rounded px-2' name="" id="">
                        <option value="0">Country</option>
                        <option value="1">India</option>
                        <option value="2">Us</option>
                    </select>
                </div>
                <div className="col-md-3 mb-3">
                    <input className='selectborder textheader py-2 w-100 rounded px-2' type="email " placeholder='Postal code ' />
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

export default Emergency_contact
