import React from 'react'
import Sidebar from '../sidebar/page'
import BreadcrumbsComponent from '../reusableComponent/breadcrumbs'
import "../profile/Profile.css"

function Editprofile() {
    return (
        <div>
            <Sidebar >
                <div className="container-fluid">
                    <BreadcrumbsComponent selectedTab={""} />
                </div>
                <div className="container-fluid mb-3">
                    <div className="row">
                        
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}

export default Editprofile
