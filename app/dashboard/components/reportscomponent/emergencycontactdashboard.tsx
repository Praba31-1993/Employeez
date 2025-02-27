import React from 'react'
import EmergencyIcon from '@mui/icons-material/Emergency';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Emergencycontactdashboardreport() {
    return (
        <div className="accordion dashboardcard mb-2 accordion-flush " id="accordionFlushExample4">
            <div className="accordion-item">
                <h2 className="accordion-header py-2 px-3" id="flush-headingOne">
                    <button
                        className="accordion-button  p-0 unselectcolor heding2 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                        aria-controls="flush-collapseFour"
                    >
                        <EmergencyIcon className='me-2' /> Emergency contact
                    </button>
                </h2>
                <div
                    id="flush-collapseFour"
                    className="accordion-collapse show accordionCollapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample4"
                >
                    <div className="accordion-body py-2  ">
                        <div className="row">
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">First Name</h5>
                                <h3 className="para textheader">Michegal </h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Relationship</h5>
                                <h3 className="para textheader">Father</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Mobile no </h5>
                                <h3 className="para textheader">123456789</h3>
                            </div>
                            <div className="col-12 mb-2 ">
                                <h3 className="heading2 textheader">Address</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Suite no/street</h5>
                                <h3 className="para textheader">No: 06</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">State</h5>
                                <h3 className="para textheader">Washington</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">City</h5>
                                <h3 className="para textheader">Washington</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Country</h5>
                                <h3 className="para textheader">United states</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Postal code</h5>
                                <h3 className="para textheader">532518</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Emergencycontactdashboardreport
