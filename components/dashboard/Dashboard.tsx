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

type item =
  | {
      title: string;
      icon: IconType;
    }
  | {
      title: string;
      icon: string;
    };

export default function JobCard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  let urlName: string = params.get("name") || "";

  const handleChangeName = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string
  ) => {
    e.preventDefault();

    params.set("name", name);
    router.push(`?${params.toString()}`);
  };
  return (
    <Container className="flex flex-col lg:flex-row space-x-10 my-10">
      <div className="basis-[30%]">
        {data?.map((item: item, index) => {
          const active = urlName === item.title;
          const IconComponent =
            typeof item.icon === "function" ? (item.icon as IconType) : null;
          return (
            <div
              key={index}
              onClick={(e) => handleChangeName(e, item.title)}
              className={`w-full flex items-center justify-start pl-11 ml-3 gap-2 rounded h-20 mb-7 cursor-pointer ${
                active ? "custom-btn" : "bg-card text-white border"
              }`}
            >
              {IconComponent ? (
                <IconComponent
                  className={`${
                    active
                      ? "rounded-full button-active p-1"
                      : "bg-[#505E6E] button-unactive rounded-full p-1 "
                  } `}
                  size={44}
                />
              ) : (
                ""
                // <p>{item.icon}</p>
              )}
              <p className="">{item.title}</p>
            </div>
          );
        })}
      </div>

      <div className="basis-[70%]">
        {urlName === "My Posted Jobs" && <JobPostHomePage />}
        {urlName === "Post Job" && <EditJobPost />}
        {urlName === "AI Tools" && <AITools />}
        {urlName === "Appointments" && <Appointments />}
        {urlName === "Hire Employees" && <HireEmployees />}
        {urlName === "Shift Plan" && <ShiftPlanpage />}
        {urlName === "Add WhatsApp Link" && <AddWhatsLinkPage />}
        {urlName === "Invoice & Payments" && <InvoicePaymentspage />}
        {urlName === "Contact & Support" && <ContactSupportPage />}
        {urlName === "Verify Account" && <VerifyAccountPage />}
        {urlName === "Download Center" && <DownloadCenterPage />}
        {urlName === "Subscription Plan" && <DashboardSubscriptionPlanCard />}
        {urlName === "Create New Plan" && <CreateNewPlan />}
        {urlName === "Edit Plan" && <CreateNewPlan title="Edit Plan" />}
      </div>
    </Container>
  );
}
