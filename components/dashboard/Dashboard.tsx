import Container from "@/share/Container";
import JobPostHomePage from "../job-details/JobPostHomePage";
import EditJobPost from "../job-details/EditjobPost";
import AITools from "../ai-tools/AI-Tools";
import Appointments from "../appointments/Appointments";
import HireEmployees from "../hireEmployes/HireEmployees";
import ShiftPlanpage from "@/app/(website)/shift-plan/page";
import AddWhatsLinkPage from "@/app/(website)/add-whats-app-link/page";
import InvoicePaymentspage from "@/app/(website)/invoice-payments/page";
import ContactSupportPage from "@/app/(website)/contact-support/page";
import VerifyAccountPage from "@/app/(website)/verify-account/page";
import DownloadCenterPage from "@/app/(website)/download-center/page";
import CreateNewPlan from "../shift-plan/CreateNewPlan";
import SalaryCalculator from "../salary-calculator/SalaryCalculator";
import SalaryDetails from "../salary-calculator/SalarayDetails";
import CaruselCard from "./dashboardSubscription/CaruselCard";
import ContractInformation from "../hireEmployes/ContactInformation";
import Sidebar from "./Sidebar";

export default function Dashboard({ searchTerm }: any) {
  console.log(searchTerm);
  return (
    <Container className="flex flex-col xl:flex-row gap-4 my-12 px-2 md:px-10 lg:px-0">
      <Sidebar />

      {/* conditional rendering */}
      <div className="flex-1 px-4 max-h-[83vh] overflow-y-scroll">
        {searchTerm === "My Posted Jobs" && <JobPostHomePage />}
        {searchTerm === "Post Job" && <EditJobPost title="Post Job" />}
        {searchTerm === "AI Tools" && <AITools />}
        {searchTerm === "Appointments" && <Appointments />}
        {searchTerm === "Hire Employees" && <HireEmployees />}
        {searchTerm === "Shift Plan" && <ShiftPlanpage />}
        {searchTerm === "Create New Plan" && <CreateNewPlan />}
        {searchTerm === "Add WhatsApp Link" && <AddWhatsLinkPage />}
        {searchTerm === "Invoice & Payments" && <InvoicePaymentspage />}
        {searchTerm === "Contact & Support" && <ContactSupportPage />}
        {searchTerm === "Verify Account" && <VerifyAccountPage />}
        {searchTerm === "Download Center" && <DownloadCenterPage />}
        {/* {searchTerm === "Subscription Plan" && <DashboardSubscriptionPlanCard />} */}
        {searchTerm === "Subscription Plan" && <CaruselCard />}
        {searchTerm === "Edit Plan" && <CreateNewPlan />}
        {searchTerm === "Salary Calculator" && <SalaryCalculator />}
        {searchTerm === "Information" && <SalaryDetails />}
        {searchTerm === "hire-employee-form" && (
          <EditJobPost title="Hire Employee" />
        )}
        {searchTerm === "hire-employee-details" && <ContractInformation />}
      </div>
    </Container>
  );
}
