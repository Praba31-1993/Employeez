import React from 'react'
import RowRadioButtons from '../reusableComponent/radiobtn'

function Typeofduration() {
  return (
    <div>
        <p>Duration Type</p>
        <RowRadioButtons/>
        <div className="d-flex justify-content-between">
            <div className="">date</div>
            <div className="">dropdown</div>
        </div>
    </div>
  )
}

export default Typeofduration