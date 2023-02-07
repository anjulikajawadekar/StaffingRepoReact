import { React, Component } from "react";
import { useState } from "react";
import exportFromJSON from "export-from-json";
import { format } from "date-fns";
import { downloadExcel } from "react-export-table-to-excel";
import { read, utils, writeFile } from 'xlsx';
import XLSX from 'sheetjs-style';

const Excel = (excelData) => {

    const headings = [[
        "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"
    ]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);

    const merge = [
        { s: { r: 1, c: 2 }, e: { r: 1, c: 8 } },{ s: { r: 2, c: 2 }, e: { r: 2, c: 8 } }
    ];

    ws["!merges"] = merge;

    ws['A2'] = {
        font: {
            name: 'arial',
            sz: 24,
            bold: true,
            color: "#F2F2F2"
        },
    }

    console.log(excelData);
    const data = [];
    let ticketData1 = [];
    let index = 1;

    let empname = localStorage.getItem("empName");
    console.log(empname);
    let a = new Date();
    let currentdate = format(a, "dd-MMM-yyyy");
    let cate = localStorage.getItem("cate");
    let title = [["Closure Report"]];
    let dates = {};

    if (cate == 'undefined') {
        title = [[empname + "'s Current Month Closures Report"]];
    }
    else if (cate == 'allcat') {
        title = [[empname + "'s All Closures report"]];
    }
    else if (cate == 'Customize') {
        title = [[empname + "'s Closures Report"]];
        let startdate = localStorage.getItem("startdate");
        let enddate = localStorage.getItem("enddate");
        dates = [["From: " + startdate + " To: " + enddate]];
        utils.sheet_add_aoa(ws, dates, { origin: 'C3', skipHeader: true });
    }
    else {
        title = [[empname + "'s " + cate + " Closures Report"]];
    }

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

    XLSX.utils.sheet_add_aoa(ws, title, { origin: 'C2', skipHeader: true});    
    // , style={font: {sz: "24", bold: true}}
    utils.sheet_add_aoa(ws, headings, { origin: 'C5', skipHeader: true });
    utils.sheet_add_json(ws, data, { origin: 'C6', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report1');
    XLSX.writeFile(wb, 'Closure report.xlsx');
}
export default Excel; 