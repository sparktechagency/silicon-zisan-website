import play from "../public/footer/play.png";
import apple from "../public/footer/apple.png";

import { Facebook, Headset, Instagram, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CustomImage from "@/share/CustomImage";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#056B82] text-white pt-10 px-6 lg:px-20">
      <div className="xl:flex  justify-between ">
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold ">Quick Links</h3>
          <hr className="" />
          <div className="flex gap-6 mt-7">
            <ul className="space-y-7 text-sm">
              <li>Profile</li>
              <li>Home</li>
              <li>Jobs</li>
              <li>Employer Services</li>
            </ul>
            <ul className="space-y-7 text-sm">
              <li>Jobs Posting</li>
              <li>Subscription Plan</li>
              <li>Salary Calculator</li>
              <li>Download Center</li>
            </ul>
          </div>
        </div>

        {/* Legal Info */}
        <div>
          <h3 className="font-semibold underline underline-offset-8">
            Legal Info
          </h3>

          <ul className="space-y-7 text-sm mt-7">
            <li>
              <Link href="/terms-condition">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold underline underline-offset-8 ">
            Contact Info
          </h3>
          <ul className="space-y-5 text-sm mt-7">
            <li className="flex items-center gap-2">
              <p className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white text-xl hover:bg-white hover:text-[#0e788f] transition cursor-pointer shadow">
                <FaWhatsapp />
              </p>
              +880258355652
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <p className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white text-xl hover:bg-white hover:text-[#0e788f] transition cursor-pointer shadow">
                <Mail size={20} />
              </p>
              JobsinAPP@Gmail.Com
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <p className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white text-xl hover:bg-white hover:text-[#0e788f] transition cursor-pointer shadow">
                <Headset size={20} />
              </p>{" "}
              Contact Us
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <p className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white text-xl hover:bg-white hover:text-[#0e788f] transition cursor-pointer shadow">
                <FaWhatsapp />
              </p>{" "}
              JobsinApp
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="font-semibold mb-4">Download Our Mobile App</h3>
          <div className="space-y-3">
            <div className="w-[240px] bg-white text-[#343434]  py-4 px-4 rounded-md text-sm flex items-center justify-center gap-3 ">
              <CustomImage item={play} width={40} height={40} />
              <p className="font-medium">
                Get in APP On <br />
                <span className="font-bold text-2xl mt-1">Google Play</span>
              </p>
            </div>
            <div className="w-[240px] bg-white text-[#343434]  py-4 px-4 rounded-md text-sm flex items-center justify-center gap-3 ">
              <CustomImage item={apple} width={36} height={36} />
              <p className="font-medium">
                Get in APP On <br />
                <span className="font-bold text-2xl mt-1">Google Play</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className="my-6" />
      <div className=" text-xs flex justify-between pb-4">
        <p>Copyright © 2025 JobsinApp</p>
        <div className=" flex justify-center gap-6">
          {/* Facebook */}
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white text-xl hover:bg-white hover:text-[#0e788f] transition cursor-pointer shadow">
            <Facebook />
          </div>

          {/* Instagram */}
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white text-xl hover:bg-white hover:text-[#0e788f] transition cursor-pointer">
            <Instagram />
          </div>

          {/* WhatsApp */}
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white text-xl hover:bg-white hover:text-[#0e788f] transition cursor-pointer">
            <FaWhatsapp size={26} />
          </div>
        </div>
      </div>
    </footer>
  );
}
