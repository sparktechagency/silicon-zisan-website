"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../public/logo.png";
import Image from "next/image";
import Container from "@/share/Container";
import { gradientClasses } from "@/styles/gradients";
import { mainNavigation } from "@/constants/navigation";
import profile from "../public/profile/avatar.png";
import call from "../public/call-header.svg";

export default function HeaderTwo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${gradientClasses.primaryBg}  sticky top-0 z-50`}>
      <Container>
        <div className="flex justify-between items-center h-24 px-5 lg:px-0">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Zasulehry" className="w-24" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center lg:space-x-8">
              {mainNavigation?.map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-md lg:text-[20px] font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "custom-btn"
                      : "text-white hover:text-blue-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="rounded-full bg-[#227C90] p-2 border-t border-b border-t-[#97d4e2] border-b-[#97d4e2]">
                <Image
                  src={call}
                  alt="Zasulehry"
                  className="lg:w-8 lg:h-8 rotate-90"
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/profile" className="hidden md:block">
            <div className="space-x-2 flex items-center">
              <Image
                src={profile}
                alt="Zasulehry"
                className="h-12 w-12 rounded-full"
              />
              <p>Kamran</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              {/* <span className="sr-only">Open main menu</span> */}
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {mainNavigation.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-blue-600 font-bold border-l-4 border-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="rounded-full bg-[#227C90] p-2 border-t border-b border-t-[#97d4e2] border-b-[#97d4e2] w-10">
              <Image
                src={call}
                alt="Zasulehry"
                className="lg:w-8 lg:h-8 rotate-90"
              />
            </div>

            {/* CTA Button */}
            <Link
              href="/profile"
              className="block  py-2 rounded-md hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={profile}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="text-gray-800 font-medium">Kamran</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
