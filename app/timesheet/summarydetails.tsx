import { useEffect, useState } from "react";
import training from '../assets/img/model_training.png';
import sick from '../assets/img/sick.png';
import casual from '../assets/img/energy_savings_leaf.png';
import dollar from '../assets/img/dollar.png';
import bag from '../assets/img/carry_on_bag.png';
import maternity from '../assets/img/pregnancy.png';
import paternity from '../assets/img/account_child_invert.png';
import eligiblePtoel from '@/app/assets/img/eligiblePTOEL.svg'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Summarycards from "./summarycards";



export default function Summarydetails({showpop,close,LeaveTypes }:any) {
    // State to control the popup active class

    const [typeOfLeaves, setTypeOfLeaves] = useState<any>();

    useEffect(()=>{
        const TypesOfLeaves = LeaveTypes?.filter((list:any)=>list?.showFlag===true);
        setTypeOfLeaves(TypesOfLeaves)
    },[LeaveTypes])

    const leaveTypeImages = [
        {label : 'Eligible PTO/EL', img:"@/app/assets/img/eligiblePTOEL.svg"}
    ]

    
    console.log('typeOfLeaves',typeOfLeaves);
    
    return (
        <>
            {/* summary of period */}
            <section className={`showpopup ${showpop ? 'showpopupactive' : ''}`}>
                <div className="summarysection">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 text-end">
                                <FontAwesomeIcon className="my-2" icon={faXmark} onClick={close} />
                            </div>
                            <div className="col-12">
                                <div className="summary py-3 d-flex justify-content-between align-items-center">
                                    <h5 className="heading me-3 textheader mb-0">Summary for period</h5>
                                    <h5 className="heading me-3 textheader mb-0">01-07 November 2024</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {
                                typeOfLeaves?.map((leave:any, index:number) => (
                                    <div key={index} className="col-lg-3 py-2">
                                        <Summarycards leaveData={leave} leaveTypeimages={leaveTypeImages}/>
                                    </div>
                                ))

                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
