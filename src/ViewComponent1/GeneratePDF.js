
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const GeneratePDF = tickets => {

  let empname= localStorage.getItem("empName");
  let a=new Date();
  let currentdate = format(a, "dd-MMM-yyyy");
  let cate=localStorage.getItem("cate");
  let startdate=localStorage.getItem("startdate");
  let enddate=localStorage.getItem("enddate");

 console.log(tickets);
  // initialize jsPDF
  const doc = new jsPDF();
 
  // define the columns we want and their titles
  const tableColumn = ["Sr No.", "Requirement", "Submission", "First", "Second","Closure","Date","Employee Name"];
  // define an empty array of rows
  const tableRows = [];
  let index=1;
  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
    const ticketData = [
      index++,
      ticket.requirement,
      ticket.submission,
      ticket.first,
      ticket.second,
      ticket.closure,
      ticket.clo_date,
      ticket.employee.emp_name
      // called date-fns to format the date on the ticket
     // format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
 
  if(cate=='undefined')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 20  },);
    doc.text(empname+"'s current month closures report", 14, 15);
  }
  else if(cate=='allcat')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 20  },);
    doc.text(empname+"'s all closures report", 14, 15);
  }
  else if(cate=='Customize')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 30  },);
    doc.text(empname+"'s closures report", 14, 15);
  doc.text("From: " +startdate+ " To: "+enddate, 14, 25);
  }
  else{
    doc.autoTable(tableColumn, tableRows, { startY: 20  },);
    doc.text(empname+"'s " +cate+ " closures report", 14, 15);
  }
  
  doc.save(`report_${dateStr}.pdf`);
};

export default GeneratePDF;