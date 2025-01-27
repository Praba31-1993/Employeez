"use client";
import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";
import Summarycards from "./summarycards";

// Interface Definitions
interface TimesheetEntry {
  calDate: string;
  codeId: string;
  projId: string;
  value: string | number;
}

interface SummaryView {
  codeId: string;
  projId: string;
  totalValue: number;
  days: string[];
  codeLabel?: string;
}

interface OverTimeData {
  projId: string;
  projName: string;
  day: string;
  value: number;
  status?: number;
  comment?: string;
}

interface SaveOrSubmitDates {
  startDate: string;
  endDate: string;
}

interface CurrentUser {
  Role: string;
}

interface Props {
  timesheetData: TimesheetEntry[];
  timesheetSummaryViewVM: SummaryView[];
  saveOrSubmitDates: SaveOrSubmitDates;
  overTimeData: OverTimeData[];
  empPayOverTimeData: OverTimeData[];
  currentUser: CurrentUser | null;
  recordComments: string;
}

const Summary: React.FC<Props> = ({
  timesheetData,
  timesheetSummaryViewVM,
  saveOrSubmitDates,
  overTimeData,
  empPayOverTimeData,
  currentUser,
  recordComments,
}) => {
  // State definitions with types
  const [summaryView, setSummaryView] = useState<SummaryView[]>([
    ...timesheetSummaryViewVM,
  ]);
  const [overTimeSummaryVM, setOverTimeSummaryVM] = useState<SummaryView[]>([]);
  const [TCRole, setTCRole] = useState<boolean>(false);
  const [OTcomments, setOTcomments] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);

  // Function to calculate summary details
  const calculateSummaryDetails = (): void => {
    const updatedSummary: SummaryView[] = summaryView.map(
      (summary: SummaryView) => ({
        ...summary,
        totalValue: 0,
        days: [],
      })
    );

    const periodStartDate: Moment = moment(
      saveOrSubmitDates.startDate,
      "YYYY-MM-DD"
    );
    const periodEndDate: Moment = moment(
      saveOrSubmitDates.endDate,
      "YYYY-MM-DD"
    );

    timesheetData.forEach((entry: TimesheetEntry) => {
      const calDate: Moment = moment(entry.calDate, "YYYY-MM-DD");
      if (
        calDate.isSameOrAfter(periodStartDate) &&
        calDate.isSameOrBefore(periodEndDate)
      ) {
        updatedSummary.forEach((summary: SummaryView) => {
          if (
            entry.codeId === summary.codeId &&
            entry.projId === summary.projId
          ) {
            summary.totalValue += parseFloat(entry.value.toString());
            summary.days.push(entry.calDate);
          }
        });
      }
    });

    if (overTimeData.length > 0) {
      getOverTimeSummary(overTimeData);
    }

    if (empPayOverTimeData.length > 0) {
      if (currentUser?.Role === "TC") setTCRole(true);
      if (recordComments?.length) {
        setOTcomments(recordComments);
        setShowComments(true);
      } else {
        setOTcomments("");
        setShowComments(false);
      }
    }

    setSummaryView(updatedSummary);
  };

  // Function to get overtime summary
  const getOverTimeSummary = (dataArray: OverTimeData[]): void => {
    const groupedData: Record<string, OverTimeData[]> =
      overTimeArraygroupByProjId(dataArray, "projId");
    const summaryRecords: SummaryView[] = Object.keys(groupedData).map(
      (key: string) => {
        const dataGroup: OverTimeData[] = groupedData[key];
        let totalHours: number = 0;

        const record: SummaryView = {
          projId: key,
          codeId: "OT",
          totalValue: 0,
          days: [],
          codeLabel: `${dataGroup[0].projName}(OT)`,
        };

        dataGroup.forEach((item: OverTimeData) => {
          if (item.value > 0) {
            record.days.push(item.day);
            totalHours += item.value;
          }
        });

        if (totalHours > 0) {
          record.totalValue = totalHours;
        }
        return record;
      }
    );

    setOverTimeSummaryVM(summaryRecords);
  };

  // Effect hook to trigger calculation on data change
  useEffect(() => {
    calculateSummaryDetails();
  }, [timesheetData, saveOrSubmitDates, overTimeData]);

  return (
    <div>
      <h3>Timesheet Summary</h3>
      <div className="d-flex flex-wrap mt-3">
        {summaryView.map((summary: SummaryView, index: number) => (
          <div key={index} className=" me-3  py-2 ">
            <Summarycards leaveData={summary} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Generic grouping function
const overTimeArraygroupByProjId = <T,>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result: Record<string, T[]>, item: T) => {
    const groupKey: string = item[key] as unknown as string;
    (result[groupKey] = result[groupKey] || []).push(item);
    return result;
  }, {});
};

export default Summary;
