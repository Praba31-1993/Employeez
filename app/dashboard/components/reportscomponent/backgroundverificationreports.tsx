import React from 'react'
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Backgroundverificationreports() {
    return (
        <div className="accordion dashboardcard mb-2 accordion-flush " id="accordionFlushExample1">
            <div className="accordion-item">
                <h2 className="accordion-header py-2 px-3" id="flush-headingOne">
                    <button
                        className="accordion-button  p-0 unselectcolor heding2 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapsetwo"
                        aria-expanded="false"
                        aria-controls="flush-collapsetwo"
                    >
                        <FingerprintOutlinedIcon className='me-2' />Background verification
                    </button>
                </h2>
                <div
                    id="flush-collapsetwo"
                    className="accordion-collapse show accordionCollapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample1"
                >
                    <div className="accordion-body py-2  ">
                        <div className="row">
                           
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">ID type</h5>
                                <h3 className="para textheader">PAN card</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">ID no</h5>
                                <h3 className="para textheader">FALA163911</h3>
                            </div>
                            <div className="col-md-4 mb-2 ">
                                <h5 className="para2 shade">Agent name</h5>
                                <h3 className="para textheader">Nolan</h3>
                            </div>
                            <div className="col-12 mb-2 ">
                                <h5 className="para2 shade">Remarks</h5>
                                <h3 className="para textheader">The date provided, 12/12/2024, marks a significant milestone for our upcoming project. It is essential to ensure that all background verification processes are completed well in advance to facilitate a smooth transition into the next phase. Please ensure that all relevant checks are thorough and documented.</h3>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Backgroundverificationreports
