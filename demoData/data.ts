import hotel from "../public/dashboard/hotel.png";
import shift from "../public/dashboard/sidebar/shift.svg";
import postJob from "../public/dashboard/sidebar/post-job.svg";
import hire from "../public/dashboard/sidebar/hire-employee.svg";
import two from "../public/dashboard/sidebar/appoinmenttwo.svg";
import jobIcon from "../public/dashboard/sidebar/job-icon.svg";
// import aiIcon from "../public/dashboard/sidebar/ai-icon.svg";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { PiNoteThin } from "react-icons/pi";
import { CiCalculator1 } from "react-icons/ci";
import { MdPodcasts } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export const data = [
  { title: "My Jobs", value: "myJobs", icon: jobIcon },
  { title: "Post Job", value: "postJob", icon: postJob },
  // { title: "AI Tools", value: "aiTools", icon: aiIcon },
  { title: "Appointments", value: "appointments", icon: two },
  { title: "Subscription Plan", value: "subscriptionPlan", icon: MdPodcasts },
  { title: "Hire Employees", value: "hireEmployees", icon: hire },
  { title: "Shift Plan", value: "shiftPlan", icon: shift },
  {
    title: "Salary Calculator",
    value: "salaryCalculator",
    icon: CiCalculator1,
  },
  { title: "WhatsApp Support", value: "whatsappSupport", icon: FaWhatsapp },
  { title: "Add WhatsApp", value: "addWhatsapp", icon: FaWhatsapp },
  { title: "Invoice & Payments", value: "invoicePayments", icon: PiNoteThin },
  {
    title: "Contact & Support",
    value: "contactSupport",
    icon: TfiHeadphoneAlt,
  },
  {
    title: "Verify Account",
    value: "verifyAccount",
    icon: MdOutlineVerifiedUser,
  },
  {
    title: "Download Center",
    value: "downloadCenter",
    icon: MdOutlineFileDownload,
  },
];

export const postJobsDetails = [
  {
    image: hotel,
    company: "Sparktech Agency",
    location: "California, Usa",
    position: "Senior Business Analys",
    jobType: "Full Time",
    salary: "$200-$300/Month",
    postedTime: "2 Days Ago",
  },
  {
    image: hotel,
    company: "Sparktech Agency",
    location: "California, Usa",
    position: "Senior Business Analys",
    jobType: "Full Time",
    salary: "$200-$300/Month",
    postedTime: "2 Days Ago",
  },
  {
    image: hotel,
    company: "Sparktech Agency",
    location: "California, Usa",
    position: "Senior Business Analys",
    jobType: "Full Time",
    salary: "$200-$300/Month",
    postedTime: "2 Days Ago",
  },
  {
    image: hotel,
    company: "Sparktech Agency",
    location: "California, Usa",
    position: "Senior Business Analys",
    jobType: "Full Time",
    salary: "$200-$300/Month",
    postedTime: "2 Days Ago",
  },
  {
    image: hotel,
    company: "Sparktech Agency",
    location: "California, Usa",
    position: "Senior Business Analys",
    jobType: "Full Time",
    salary: "$200-$300/Month",
    postedTime: "2 Days Ago",
  },
  {
    image: hotel,
    company: "Sparktech Agency",
    location: "California, Usa",
    position: "Senior Business Analys",
    jobType: "Full Time",
    salary: "$200-$300/Month",
    postedTime: "2 Days Ago",
  },
  {
    image: hotel,
    company: "Sparktech Agency",
    location: "California, Usa",
    position: "Senior Business Analys",
    jobType: "Full Time",
    salary: "$200-$300/Month",
    postedTime: "2 Days Ago",
  },
];

// hire employees details
export const contractSections = [
  {
    title: "Contract Content",
    content: [
      "The Recruiter Searches For Suitable Candidates For A Position To Hire In Their Company. This Contract Governs The Conditions Of The Recruiter’s Placement And Mutual Rights And Obligations Of The Parties.",
    ],
  },
  {
    title: "Subject Of The Agreement",
    content: [
      "The Recruiter Undertakes To Search For And Present Suitable Candidates To The Client As Available And Ready For The Position.",
      "The Client Undertakes To Provide The Recruiter With All Information Necessary For The Search, Such As Job Description, Candidate Profile Or Specific Requirements.",
    ],
  },
  {
    title: "Recruter's Services",
    content: [
      "The Recruiter Will Only Search Suitable Candidates For The Advertised Position And Present Them To The Client For Selection.",
      "The Recruiter Will Not Conduct Preliminary Selection, Verify Qualifications, Nor References, Conduct Background Checks, Or Similar.",
      "All These Activities Are The Sole Duty And Liability Of The Client.",
      "The Recruiter Will Assist The Client During The Selection Process And Ongoing Interactions.",
    ],
  },
  {
    title: "Client’s Obligations",
    content: [
      "The Client Shall Pay The Agreed Fee To The Recruiter As Per Offer Or Contract. The Fee Is Payable In Advance, Unless Agreed Otherwise.",
      "The Client Shall Provide All Necessary Information For The Recruiter’s Search.",
      "The Client Agrees To Immediately Inform The Recruiter In Writing About Any Hiring Decision And Refuse Knowledge Of The Recruiter’s Candidates.",
    ],
  },
  {
    title: "Fee And Payment Terms",
    content: [
      "A Recruitment Fee Corresponding To 10% Per Placement Or Min €7,000 Of The Agreed Annual Salary Of The Recommended Person Shall Apply.",
      "An Invoice Will Be Issued After The Candidate’s Acceptance Of Employment With The Client. The Client’s Payment Term Is 14 Days From Invoice Date Without Deduction (Net). Trouble Or Application Engagements Only Can Be Borne By The Client If The Recruiter Has Been Informed.",
    ],
  },
  {
    title: "Guarantees and Refunds",
    content: [
      "If The Candidate Does Not Stay With The Client, Without A Justified Or Disciplinary Dismissal, The Client Has The Right To Request A Replacement Within 2 Months.",
      "It Is Not Guaranteed That A Candidate Will Be Successfully Replaced; The Client Must Request A Re-Search At Least Within 14 Days Of The Placement’s Termination.",
    ],
  },
  {
    title: "Confidentiality And Data Protection",
    content: [
      "Both Parties Agree To Keep All Personal Information Transmitted Under This Agreement Especially Personal Data Of Candidates Strictly Confidential And Use Them Only For The Purpose Of Recruitment. All Personal Data Will Be Processed According To The GDPR And National Laws For The Purpose Of Recruitment Only.",
    ],
  },
  {
    title: "Liability",
    content: [
      "The Recruiter Is Not Liable For The Accuracy Or Completeness Of The Information Provided By The Proposed Candidate.",
      "The Recruiter Is Not Responsible For Failures Arising From The Incorrect Information Provided By The Client.",
    ],
  },
  {
    title: "Duration And Termination",
    content: [
      "This Agreement Is Valid For 3 Months From Signing Unless Otherwise Agreed.",
      "The Agreement Can Be Terminated By Either Party With Two Weeks’ Notice.",
    ],
  },
  {
    title: "Final Provisions",
    content: [
      "This Agreement Shall Be Governed By The Laws Of Bangladesh.",
      "Amendments Or Additions To This Agreement Must Be Made In Writing And Signed By Both Parties.",
    ],
  },
];

// salary calculator
export const child = [
  { id: 1, label: "One" },
  { id: 1, label: "Two" },
];

// age
export const age = [
  { id: 1, label: "17-44" },
  { id: 2, label: "45-64" },
  { id: 3, label: "65+" },
];

// position
export const position = [
  { id: 1, label: "232344" },
  { id: 2, label: "987645" },
];

// post job categories
export const jobRoles = [
  "Senior Business Analytics",
  "It & Development",
  "Photo Editing",
  "Cleaning",
  "Plumber",
  "Electrician",
  "Driver",
  "Software",
];

export const jobTypes = [
  "Full Time",
  "Part Time",
  "Mini Job",
  "Ausbildung",
  "Temporary Work",
  "Career Changer",
];
