import React from 'react';

function Detailview() {
    const arrayList = [
        { Hours: "08", Date: "08/11/2024", Leave_Type: "LOP", Reason: "Going to Temple aajvahajakaala;laa" },
        { Hours: "08", Date: "08/11/2024", Leave_Type: "Sick Leave", Reason: "Health issue" },
        { Hours: "08", Date: "08/11/2024", Leave_Type: "LOP", Reason: "Going to Temple" },
        { Hours: "08", Date: "08/11/2024", Leave_Type: "Casual Leave", Reason: "Going to Function" },
        { Hours: "08", Date: "08/11/2024", Leave_Type: "LOP", Reason: "Going to Temple" },
    ];

    return (
        <>
            <div className="row mt-3">
                <div className="col-6">
                    <p className="textheader para my-2">Detail View</p>
                </div>
            </div>
            <div className="row mt-1">
               <div className="col-xxl-8 col-lg-9">
               <div style={{overflowX:"auto"}}>
               <table className="table mb-0 tabletype">
                    <thead style={{ backgroundColor: "#F6F7FB" }}>
                        <tr>
                            <th className='textheader para' scope="col">Date</th>
                            <th className='textheader para' scope="col">Leave Type</th>
                            <th className='textheader para' scope="col">Reason</th>
                            <th className='textheader para' scope="col">Hours</th>
                        </tr>
                    </thead>
                    <tbody className='dashboardcard'>
                        {arrayList.map((item, index) => (
                            <tr key={index}>
                                <td className='para textheader'>{item.Date}</td>
                                <td className='para textheader'>{item.Leave_Type}</td>
                                <td className='para textheader'>{item.Reason}</td>
                                <td className='para textheader'>{item.Hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               </div>
               </div>
            </div>
        </>
    );
}

export default Detailview;
