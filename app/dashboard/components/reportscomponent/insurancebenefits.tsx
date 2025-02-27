import React from 'react'
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Insurancedashboardreports() {
    return (
        <div className="accordion dashboardcard mb-2 accordion-flush " id="accordionFlushExample2">
            <div className="accordion-item">
                <h2 className="accordion-header py-2 px-3" id="flush-headingTwo">
                    <button
                        className="accordion-button  p-0 unselectcolor heding2 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapsethree"
                        aria-expanded="false"
                        aria-controls="flush-collapsethree"
                    >
                        <LoyaltyIcon className='me-2' /> Insurance benefits
                    </button>
                </h2>
                <div
                    id="flush-collapsethree"
                    className="accordion-collapse show accordionCollapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample2"
                >
                    <div className="accordion-body py-2  ">
                        <div className="row">
                           
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Health insurance</h5>
                                <h3 className="para textheader">Enrolled</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Insurance type</h5>
                                <h3 className="para textheader">Ins-HSA</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Medical coverage</h5>
                                <h3 className="para textheader">Employee with family</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Dental coverage</h5>
                                <h3 className="para textheader">Employee only</h3>
                            </div>
                            <div className="col-md-8 mb-2 ">
                                <h5 className="para2 shade">Vision</h5>
                                <h3 className="para textheader">N/A</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Life insurance</h5>
                                <h3 className="para textheader">Enrolled</h3>
                            </div>
                            <div className="col-md-8 mb-2 ">
                                <h5 className="para2 shade">Effective date</h5>
                                <h3 className="para textheader">12/12/2026</h3>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Insurancedashboardreports
