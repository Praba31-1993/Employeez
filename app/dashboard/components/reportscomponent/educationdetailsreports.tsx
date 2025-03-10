import React from 'react'
import SchoolIcon from '@mui/icons-material/School';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Educationdetailsreports() {
    return (
        <div className="accordion dashboardcard mb-2 accordion-flush " id="accordionFlushExample7">
            <div className="accordion-item">
                <h2 className="accordion-header py-2 px-3" id="flush-headingOne">
                    <button
                        className="accordion-button  p-0 unselectcolor heding2 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseSeven"
                        aria-expanded="false"
                        aria-controls="flush-collapseSeven"
                    >
                        <SchoolIcon className='me-2' /> Education details
                    </button>
                </h2>
                <div
                    id="flush-collapseSeven"
                    className="accordion-collapse show accordionCollapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample7"
                >
                    <div className="accordion-body py-2  ">
                        <div className="row">
                           
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Degree/Qualification</h5>
                                <h3 className="para textheader">B.E</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Major/Field of study</h5>
                                <h3 className="para textheader">Computer science</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Institute/University</h5>
                                <h3 className="para textheader">ABC institute of engineering</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Graduation year</h5>
                                <h3 className="para textheader">2021</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Percentage</h5>
                                <h3 className="para textheader">75.5%</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Educationdetailsreports
