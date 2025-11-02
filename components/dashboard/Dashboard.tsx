"use client";

import Container from "@/share/Container";
import { data } from "@/demoData/data";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
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
import DashboardSubscriptionPlanCard from "./dashboardSubscription/DashboardSubscriptionPlanCard";
import CreateNewPlan from "../shift-plan/CreateNewPlan";
import SalaryCalculator from "../salary-calculator/SalaryCalculator";
import SalaryDetails from "../salary-calculator/SalarayDetails";
import Image from "next/image";
import CaruselCard from "./dashboardSubscription/CaruselCard";

type item =
  | {
      title: string;
      icon: IconType;
    }
  | {
      title: string;
      icon: string;
    };

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const urlName: string = params.get("name") || "My Posted Jobs";

  const handleChangeName = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string
  ) => {
    e.preventDefault();

    params.set("name", name);
    router.push(`?${params.toString()}`);
  };
  return (
    <Container className="flex flex-col xl:flex-row gap-4 my-12 px-2 md:px-10 lg:px-0">
      <div className="basis-[29%] px-4 max-h-[83vh] overflow-y-scroll">
        {data?.map((item: item, index) => {
          const active = urlName === item.title;
          const icon = item.icon;
          const isFunctionIcon = typeof icon === "function";
          const IconComponent = isFunctionIcon ? (icon as IconType) : null;
          const iconSrc = !isFunctionIcon ? (icon as string) : undefined;

          return (
            <div
              key={index}
              onClick={(e) => handleChangeName(e, item.title)}
              className={` flex items-center pl-5 mx-auto mb-3 gap-3 md:text-[18px] font-medium rounded py-2 w-full cursor-pointer ${
                active
                  ? "custom-btn"
                  : "bg-card text-white border border-white/20"
              }`}
            >
              {IconComponent ? (
                <IconComponent
                  className={`${
                    active
                      ? "rounded-full button-active p-1 size-10"
                      : "bg-[#505E6E] button-unactive rounded-full p-1 size-10"
                  }`}
                />
              ) : (
                <Image
                  src={iconSrc!}
                  alt={item.title}
                  width={40}
                  height={40}
                  className={`${
                    active
                      ? "rounded-full button-active p-1"
                      : "bg-[#505E6E] button-unactive rounded-full p-1 size-10"
                  }`}
                />
              )}
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>

      {/* conditional rendering */}

      <div className="flex-1 px-4 max-h-[83vh] overflow-y-scroll">
        {urlName === "My Posted Jobs" && <JobPostHomePage />}
        {urlName === "Post Job" && <EditJobPost title="Post Job" />}
        {urlName === "AI Tools" && <AITools />}
        {urlName === "Appointments" && <Appointments />}
        {urlName === "Hire Employees" && <HireEmployees />}
        {urlName === "Shift Plan" && <ShiftPlanpage />}
        {urlName === "Add WhatsApp Link" && <AddWhatsLinkPage />}
        {urlName === "Invoice & Payments" && <InvoicePaymentspage />}
        {urlName === "Contact & Support" && <ContactSupportPage />}
        {urlName === "Verify Account" && <VerifyAccountPage />}
        {urlName === "Download Center" && <DownloadCenterPage />}
        {/* {urlName === "Subscription Plan" && <DashboardSubscriptionPlanCard />} */}
        {urlName === "Subscription Plan" && <CaruselCard />}
        {urlName === "Create New Plan" && <CreateNewPlan />}
        {urlName === "Edit Plan" && <CreateNewPlan title="Edit Plan" />}
        {urlName === "Salary Calculator" && <SalaryCalculator />}
        {urlName === "Information" && <SalaryDetails />}
      </div>
    </Container>
  );
}
