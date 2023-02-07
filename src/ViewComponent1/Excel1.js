import { React, Component } from "react";
import { useState } from "react";
import exportFromJSON from "export-from-json";
import { format } from "date-fns";
import { downloadExcel } from "react-export-table-to-excel";
import { read, utils, writeFile } from 'xlsx';

const Excel1 = (excelData) => {

  console.log(excelData);
  const data = [];
  let ticketData1 = [];
  let index = 1;

  excelData.forEach(exc => {

    ticketData1 = [
      index++,
      exc.requirement,
      exc.submission,
      exc.first,
      exc.second,
      exc.closure,
      exc.clo_date,
      exc.employee.emp_name,
    ];
    data.push(ticketData1)
  });

  // exportFromJSON({ data, fileName, exportType });

  const headings = [[
    "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"
  ]];
  const wb = utils.book_new();
  const ws = utils.json_to_sheet([]);
  utils.sheet_add_aoa(ws, headings);
  utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
  utils.book_append_sheet(wb, ws, 'Report');
  writeFile(wb, 'Closure report.xlsx');




}
export default Excel1; 