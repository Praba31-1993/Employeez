import React from 'react'
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Worksitedreports() {
    return (
        <div className="accordion dashboardcard mb-2 accordion-flush " id="accordionFlushExample3">
            <div className="accordion-item">
                <h2 className="accordion-header py-2 px-3" id="flush-headingOne">
                    <button
                        className="accordion-button  p-0 unselectcolor heding2 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapsefour"
                        aria-expanded="false"
                        aria-controls="flush-collapsefour"
                    >
                        <LocationCityOutlinedIcon className='me-2' /> Work Site
                    </button>
                </h2>
                <div
                    id="flush-collapsefour"
                    className="accordion-collapse show accordionCollapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample3"
                >
                    <div className="accordion-body py-2  ">
                        <div className="row">
                           
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Client name</h5>
                                <h3 className="para textheader">ABC technologies</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Suite no/Street</h5>
                                <h3 className="para textheader">No152/GSYW </h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">State</h5>
                                <h3 className="para textheader">MI</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">City</h5>
                                <h3 className="para textheader">MI</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Country</h5>
                                <h3 className="para textheader">United States of America</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Postal code</h5>
                                <h3 className="para textheader">112345</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Worksitedreports
