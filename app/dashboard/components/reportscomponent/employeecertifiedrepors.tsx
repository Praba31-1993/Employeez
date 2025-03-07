import React from 'react'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Employeecertifiedrepos() {
    return (
        <div className="accordion dashboardcard mb-2 accordion-flush " id="accordionFlushExample8">
            <div className="accordion-item">
                <h2 className="accordion-header py-2 px-3" id="flush-headingOne">
                    <button
                        className="accordion-button  p-0 unselectcolor heding2 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseEight"
                        aria-expanded="false"
                        aria-controls="flush-collapseEight"
                    >
                        <WorkspacePremiumOutlinedIcon className='me-2' /> Certification
                    </button>
                </h2>
                <div
                    id="flush-collapseEight"
                    className="accordion-collapse show accordionCollapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample8"
                >
                    <div className="accordion-body py-2  ">
                        <div className="row">
                           
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Certificate name</h5>
                                <h3 className="para textheader">Front end development</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Organization name</h5>
                                <h3 className="para textheader">Example intuits</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Issued date</h5>
                                <h3 className="para textheader">12/12/2021</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Expiry date</h5>
                                <h3 className="para textheader">N/A</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employeecertifiedrepos
