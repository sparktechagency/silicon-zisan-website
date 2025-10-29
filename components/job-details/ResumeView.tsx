import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import resume from "../../public/dashboard/profile-view/cv.png";

export default function ResumeView({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-none bg-card">
        <div className="mt-6">
          <Image src={resume} alt="resume" width={1000} height={1000} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
