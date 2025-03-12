import DatePickerComponent from "@/app/reusableComponent/datepicler";
import RowRadioButtons from "@/app/reusableComponent/radiobtn";
import TextAreaEditor from "@/app/reusableComponent/textareaeditor";
import React, { useState } from "react";
import "../projectstatus.css";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import { Colors } from "@/app/reusableComponent/styles";
import TextField from "@mui/material/TextField";

function CreateProject() {
  const useColors = Colors();
  const [statusHistory, setStatusHistory] = useState<string>("Green");

  const statusSummary: any = [
    {
      id: 1,
      name: "Green",
      color:'#00FF00'
    },
    {
      id: 2,
      name: "Red",
      color:'#FF0000'
    },
    {
      id: 3,
      name: "Yellow",
      color:'#FFFF00'
    },
  ];

  return (
    <div>
      <div className="row px-0 g-3">
        <div className="col-12 col-md-8 col-xx-8">
          <div className="dashboardcard p-3 rounded h-100">
            <p className="textheader para my-2 ps-2">Project details</p>
            <div className="row row-gap-4">
              <div className="col-md-4 col-12 colPadding">
                <select
                  className="w-100 p-3 rounded textheader selectborder"
                  name=""
                  id=""
                >
                  <option value="">Select Project Name</option>
                  <option value="Marvel">Marvel</option>
                  <option value="Employeez">Employeez</option>
                </select>
              </div>
              <div className="col-xxl-4 col-md-4 col-12 colPadding">
                <DatePickerComponent />
              </div>
              <div className="col-xxl-4 col-md-4 col-12 colPadding">
                <DatePickerComponent />
              </div>
              <div className="col-xxl-4 col-md-4 col-12 colPadding">
                <select
                  className="w-100 p-3 rounded textheader selectborder"
                  name=""
                  id=""
                >
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="col-xxl-8 col-md-8 col-12 colPadding">
                <p id="demo-row-radio-buttons-group-label" className="mb-0">
                  Status Summary
                </p>
                <RowRadioButtons
                  list={statusSummary}
                  selectedValue={statusHistory}
                  newDayTypevalue={(data: string) => setStatusHistory(data)}
                />
              </div>
              <div className="col-12 mb-3 colPadding">
                <p id="demo-row-radio-buttons-group-label " className="">
                  Project Description
                </p>
                <TextAreaEditor />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-md-4 col-12 ">
          <div className="dashboardcard p-3 rounded">
            <p className="textheader para my-2">Add Comments</p>

            <div className="mt-3 p-0">
              <TextField
                id="outlined-multiline-static"
                label="*Key Accomplish Last Period"
                multiline
                rows={4}
                fullWidth
              />
            </div>
            <div className="mt-3 p-0">
              <TextField
                id="outlined-multiline-static"
                label="*Upcoming Task:"
                multiline
                rows={4}
                fullWidth
              />
            </div>
            <div className="mt-3 p-0">
              <TextField
                id="outlined-multiline-static"
                label="Issues"
                multiline
                rows={4}
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-end gap-3 py-4">
          <div className="ms-3">
            <Outlinebutton
              color={useColors.themeRed}
              border={`1px solid ${useColors.themeRed}`}
              text="Save"
              fontSize="12px"
              background="transparent"
              variant="outlined"
            />
          </div>
          <div className="ms-3">
            <Outlinebutton
              color="#FFF"
              border={`1px solid ${useColors.themeRed}`}
              text="Submit"
              fontSize="12px"
              background={useColors.themeRed}
              variant="outlined"
              //  onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
