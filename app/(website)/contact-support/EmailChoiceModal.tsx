"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaEnvelope, FaGoogle, FaMicrosoft, FaYahoo } from "react-icons/fa";

const EmailChoiceModal = ({ email, trigger }: any) => {
  const providers = [
    {
      name: "Default Mail App",
      icon: <FaEnvelope className="text-white" />,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      href: `mailto:${email}`,
      target: "_self",
    },
    {
      name: "Gmail",
      icon: <FaGoogle className="text-white" />,
      color: "bg-[#EA4335]",
      hoverColor: "hover:bg-[#d33828]",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      target: "_blank",
    },
    {
      name: "Outlook / Hotmail",
      icon: <FaMicrosoft className="text-white" />,
      color: "bg-[#0078D4]",
      hoverColor: "hover:bg-[#006abc]",
      href: `https://outlook.office.com/mail/deeplink/compose?to=${email}`,
      target: "_blank",
    },
    {
      name: "Yahoo Mail",
      icon: <FaYahoo className="text-white" />,
      color: "bg-[#6001D2]",
      hoverColor: "hover:bg-[#5200b3]",
      href: `https://compose.mail.yahoo.com/?to=${email}`,
      target: "_blank",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:w-[28vw] bg-[#1E2A37]">
        <div
          className=" animate-in fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6 pt-2">
            <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-teal-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Send Email</h3>
            <p className="text-gray-400 text-sm">
              Choose your preferred email provider
            </p>
            <p className="text-teal-400 text-xs font-mono mt-1 break-all">
              {email}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {providers.map((provider) => (
              <a
                key={provider.name}
                href={provider.href}
                target={provider.target}
                rel={
                  provider.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                // onClick={onClose}
                className={`flex items-center gap-4 p-3 rounded-xl ${provider.color} ${provider.hoverColor} transition-all group shadow-lg`}
              >
                <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  {provider.icon}
                </div>
                <span className="text-white font-medium">{provider.name}</span>
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailChoiceModal;
