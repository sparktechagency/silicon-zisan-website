import Container from "@/share/Container";
import Sidebar from "./Sidebar";

// Dashboard pages
import JobPostHomePage from "../job-details/JobPostHomePage";
import PostJobForm from "../post-job/PostJobForm";
import EditJobPost from "../job-details/post-job-form/EditjobPost";

import AITools from "../ai-tools/AI-Tools";
import Appointments from "../appointments/Appointments";
import HireEmployees from "../hireEmployes/HireEmployees";
import ContractInformation from "../hireEmployes/ContactInformation";

import ShiftPlanpage from "@/app/(website)/shift-plan/page";
import CreateNewPlan from "../shift-plan/CreateNewPlan";

import AddWhatsLinkPage from "@/app/(website)/add-whats-app-link/page";
import InvoicePaymentspage from "@/app/(website)/invoice-payments/page";
import ContactSupportPage from "@/app/(website)/contact-support/page";
import VerifyAccountPage from "@/app/(website)/verify-account/page";
import DownloadCenterPage from "@/app/(website)/download-center/page";

import SalaryCalculator from "../salary-calculator/SalaryCalculator";
import SalaryDetails from "../salary-calculator/SalarayDetails";

import CaruselCard from "./dashboardSubscription/CaruselCard";
import { JSX } from "react";
import NotFound from "@/app/not-found";
import HireEmployeeForm from "../hireEmployes/HireEmployeeForm";

// --------------------
// Dashboard Component
// --------------------
export default function Dashboard({ searchTerm }: { searchTerm?: string }) {
  const dashboardPages: Record<string, JSX.Element> = {
    "My Jobs": <JobPostHomePage />,
    "Post Job": <PostJobForm />,
    "AI Tools": <AITools />,
    Appointments: <Appointments />,
    "Hire Employees": <HireEmployees />,
    HireEmployeeForm: <HireEmployeeForm />,
    "Shift Plan": <ShiftPlanpage />,
    "Create New Plan": <CreateNewPlan />,
    "Add WhatsApp": <AddWhatsLinkPage />,
    "Invoice & Payments": <InvoicePaymentspage />,
    "Contact & Support": <ContactSupportPage />,
    "Verify Account": <VerifyAccountPage />,
    "Download Center": <DownloadCenterPage />,
    "Subscription Plan": <CaruselCard />,
    "Edit Plan": <CreateNewPlan />,
    "Salary Calculator": <SalaryCalculator />,
    Information: <SalaryDetails />,
    "hire-employee-form": <EditJobPost title="Hire Employee" />,
    "hire-employee-details": <ContractInformation />,
  };

  return (
    <Container className="flex flex-col xl:flex-row gap-4 my-12 px-2 md:px-10 lg:px-0">
      <Sidebar />

      {/* Content */}
      <div className="flex-1 px-4 max-h-[83vh] overflow-y-scroll">
        {searchTerm ? dashboardPages[searchTerm] ?? <NotFound /> : <NotFound />}
      </div>
    </Container>
  );
}
