import React from 'react'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Workauthrizeddashboardreports() {
    return (
        <div className="accordion dashboardcard accordion-flush " id="accordionFlushExample1">
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
                        <BadgeOutlinedIcon className='me-2' /> Work authorization
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
                           
                            <div className="col-md-4 mb-2 text-start">
                                <h5 className="para2 shade">Work status</h5>
                                <h3 className="para textheader">H1B1</h3>
                            </div>
                            <div className="col-md-4 mb-2 text-start">
                                <h5 className="para2 shade">Work status expiry date</h5>
                                <h3 className="para textheader">12/12/2026</h3>
                            </div>
                            <div className="col-md-4 mb-2 text-start">
                                <h5 className="para2 shade">ID type</h5>
                                <h3 className="para textheader">Driving licence</h3>
                            </div>
                            <div className="col-md-4 mb-2 text-start">
                                <h5 className="para2 shade">ID no</h5>
                                <h3 className="para textheader">FAUQN5162</h3>
                            </div>
                            <div className="col-md-4 mb-2 text-start">
                                <h5 className="para2 shade">ID expiry date</h5>
                                <h3 className="para textheader">12/12/2026</h3>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Workauthrizeddashboardreports
