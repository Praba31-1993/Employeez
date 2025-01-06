import { TextField } from "@mui/material";
import React from "react";

function TimeOffDetails() {
    return (
        <div className="contentSection my-3">
            <div className="row justify-content-between py-2">
                <div className="col-6">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>
                <div className="col-6">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>
            </div>
            <div className="row justify-content-between py-2">
                <div className="col-12">
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        fullWidth
                    />
                </div>
            </div>
            <div className="row justify-content-between py-2">
                <div className="col-12">
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        fullWidth
                    />
                </div>
            </div>
            <div className="row justify-content-between pt-2">
                <div className="col-12">
                    <p>
                        {" "}
                        Status : <span>Submitted</span>
                    </p>
                </div>
            </div>
            <hr className="m-0" />
        </div>
    );
}

export default TimeOffDetails;
