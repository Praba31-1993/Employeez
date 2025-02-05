import React from 'react'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

function General_document() {
    return (
        <div className='dashboardcard rounded py-3 mt-3'>
            <div className="row">
                <div className="col-12  mb-3">
                    <h2 className="heading2 textheader">General documents</h2>
                </div>
                <div className="col-12">
                    <div className="documents rounded py-2 ps-3 mb-2">
                        <p className="mb-0 textheader para"> <DescriptionOutlinedIcon  className='me-2' sx={{color:"#8C57FF"}} />Covid document.pdf </p>
                    </div>
                    <div className="documents rounded py-2 ps-3 mb-2">
                        <p className="mb-0 textheader para"> <DescriptionOutlinedIcon  className='me-2' sx={{color:"#8C57FF"}} />Employment document.docx </p>
                    </div>
                    <div className="documents rounded py-2 ps-3 mb-2">
                        <p className="mb-0 textheader para"> <DescriptionOutlinedIcon  className='me-2' sx={{color:"#8C57FF"}} />Document 1 </p>
                    </div>
                    <div className="documents rounded py-2 ps-3 mb-2">
                        <p className="mb-0 textheader para"> <DescriptionOutlinedIcon  className='me-2' sx={{color:"#8C57FF"}} />Document 2 </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default General_document
