import React, { useState, useEffect, useMemo } from "react";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { Chart } from "react-google-charts";

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [
  [
    "Research",
    "Find sources",
    new Date(2015, 0, 1),
    new Date(2015, 0, 5),
    null,
    100,
    null,
  ],
  [
    "Write",
    "Write paper",
    null,
    new Date(2015, 0, 9),
    daysToMilliseconds(3),
    25,
    "Research,Outline",
  ],
  [
    "Cite",
    "Create bibliography",
    null,
    new Date(2015, 0, 7),
    daysToMilliseconds(1),
    20,
    "Research",
  ],
  [
    "Complete",
    "Hand in paper",
    null,
    new Date(2015, 0, 10),
    daysToMilliseconds(1),
    0,
    "Cite,Write",
  ],
  [
    "Outline",
    "Outline paper",
    null,
    new Date(2015, 0, 6),
    daysToMilliseconds(1),
    100,
    "Research",
  ],
];

export const data = [columns, ...rows];

function GanttChart() {
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   // fetching data

  //   setIsLoading(false);
  // }, []);

  // return (
  //   <Scheduler
  //     // decide when to show loading indicators
  //     isLoading={isLoading}
  //     // your data
  //     data={data}
  //     // callback when user click's on one of the grid's tile
  //     onItemClick={(clickedItem) => console.log(clickedItem)}
  //     // filter function that let's you handling filtering on your end
  //     onFilterData={() => {
  //       // filter your data
  //     }}
  //     // callback when user clicks clearing filter button
  //     onClearFilterData={() => {
  //       // clear all your filters
  //     }}
  //     config={{
  //       /* 
  //           change filter button state based on your filters
  //           < 0 - filter button invisible,
  //           0 - filter button visible, no filter applied, clear filters button invisible,
  //           > 0 - filter button visible, filters applied (clear filters button will be visible)
  //         */
  //       filterButtonState: 0,
  //       // decide start zoom variant (0 - weeks, 1 - days)
  //       zoom: 0,
  //       // select language for scheduler
  //       lang: "en",
  //       // decide how many resources show per one page
  //       maxRecordsPerPage: 20,
  //     }}
  //   />
  // );
  return <Chart chartType="Gantt" width="100%" height="50%" data={data} />;
}

export default GanttChart;
