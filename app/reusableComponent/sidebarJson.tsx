import dashboardWhite from "@/public/assets/img/dashboard-white.svg";
import dashboardGrey from "@/public/assets/img/dashboard-grey.svg";
import timesheetGrey from "@/public/assets/img/timesheet_grey.svg";
import timesheetWhite from "@/public/assets/img/timesheet_white.svg";



export const menuForSuperAdmin: any = [
  {
    id: "2",
    role: "Basic",
    roleItems: [
      {
        name: "Timesheet",
        path: "/timesheet",
        icon: timesheetWhite,
        inactive: timesheetGrey,
        checked: true,
      },
      {
        name: "Expenses",
        path: "/expenses",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Time Off",
        path: "/timeoff",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Project status",
        path: "/projectstatus",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Employee list",
        path: "/employeelist",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Report",
        path: "",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
        childItems: [
          {
            name: "Self",
            path: "/report/self",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
          {
            name: "Approver",
            path: "/report/approver",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
          {
            name: "Payroll",
            path: "/report/payroll",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
          {
            name: "HR",
            path: "/report/hr",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
          {
            name: "Sales",
            path: "/report/sales",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
          {
            name: "Utilization",
            path: "/report/utilization",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
          {
            name: "Financial",
            path: "/report/financial",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
          {
            name: "Public accesss doc",
            path: "/report/publicaccesssdoc",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
        ],
      },
      {
        name: "Employee document",
        path: "/employeedocument",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "17",
    role: "Delegation",
    roleItems: [
      {
        name: "Timesheet",
        path: "/timesheet",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Expenses",
        path: "/expenses",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "19",
    role: "Manager",
    roleItems: [
      {
        name: "Approval System",
        path: "/approval system",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Resource allocation",
        path: "/resource allocation",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Project status approval",
        path: "/projectstatusapproval",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Disciplinary action",
        path: "/disciplinaryaction",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "23",
    role: "Human Resources",
    roleItems: [
      {
        name: "Employee Prehire",
        path: "/employeeprehire",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Employee create/Edit",
        path: "/employeecreate/Edit",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "I-9/E - verify",
        path: "/I-9/E-verify",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Employee doc resources",
        path: "/employeedocresources",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "27",
    role: "Immigration",
    roleItems: [
      {
        name: "Immigration docs",
        path: "/immigrationdocs",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "28",
    role: "Sales",
    roleItems: [
      {
        name: "Work order",
        path: "/workorder",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Job posting",
        path: "/jobposting",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "30",
    role: "Sub-Contract onboarding",
    roleItems: [
      {
        name: "Onboarding dashboard",
        path: "/onboardingdashboard",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Onboarding request",
        path: "/onboardingrequest",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "32",

    role: "Accounting",
    roleItems: [
      {
        name: "Receivable",
        path: "/receivable ",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Payable",
        path: "/payable",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "34",

    role: "Payroll",
    roleItems: [
      {
        name: "Extract payroll",
        path: "/extractpayroll ",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "India payroll",
        path: "/indiapayroll",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "36",

    role: "Admin",
    roleItems: [
      {
        name: "Settings",
        path: "/setting",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
  {
    id: "37",
    role: "Subscription",
    roleItems: [
      {
        name: "Employee subscription",
        path: "/employeesubscription",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
    ],
  },
];

export const menuItemForEmployee: any = [
  {
    id: "2",
    role: "Basic",
    roleItems:
     [
      {
        name: "Timesheet",
        path: "/timesheet",
        icon: timesheetWhite,
        inactive: timesheetGrey,
        checked: true,
      },
      {
        name: "Expenses",
        path: "/expenses",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Time Off",
        path: "/timeoff",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Project status",
        path: "/projectstatus",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Employee document",
        path: "/employeedocument",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
      {
        name: "Employee list",
        path: "/employeelist",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
      },
     
      {
        name: "Report",
        path: "",
        icon: dashboardWhite,
        inactive: dashboardGrey,
        checked: true,
        childItems: [
          {
            name: "Self",
            path: "/report/self",
            icon: dashboardGrey,
            inactive: dashboardGrey,
            checked: true,
          },
         
        ],
      },
     
    ],
  },
];
