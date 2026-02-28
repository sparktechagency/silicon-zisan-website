"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../public/logo.png";
import Image from "next/image";
import Container from "@/share/Container";
import { gradientClasses } from "@/styles/gradients";
import { mainNavigation } from "@/constants/navigation";
import call from "../public/call-header.svg";
import CustomImage from "@/utils/CustomImage";
import { disconnectSocket, getSocket } from "@/utils/socket";
import { revalidate } from "@/utils/revalidateTag";
import { useChatSocket } from "@/hooks/useChatSocket";

export default function HeaderTwo({
  notification,
  token,
  messageNotification,
  profileData,
}: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useChatSocket({
    onChatList: (chats: any) => chats,
    onMessage: (msg: any) => msg,
    // onMessage: (msg) => setMessages((prev: any) => [...prev, msg]),
    onError: (err: any) => console.error(err),
  });

  const count =
    messageNotification?.reduce(
      (total: any, item: any) => total + item.unreadCount,
      0,
    ) || 0;

  // get notifications
  const socket = getSocket(token);
  // get notifications
  useEffect(() => {
    const initNotificationSocket = async () => {
      // const token = await getToken();
      if (!token) return;

      const socket = getSocket(token);

      socket.on("getNotification", () => {
        revalidate("chatlist");
      });
    };

    initNotificationSocket();

    return () => {
      disconnectSocket();
    };
  }, [token, socket]);

  return (
    <nav className={`${gradientClasses.primaryBg} sticky top-0 z-50`}>
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
                  className={`relative px-3 py-2 rounded-md text-md lg:text-[20px] font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "custom-btn"
                      : "text-white hover:text-blue-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label === "Dashboard" || item.label === "Alerts" ? (
                      <span className="notranslate">{item.label}</span>
                    ) : (
                      item.label
                    )}

                    {/* Inbox Count */}
                    {item.label === "Inbox" && count > 0 && (
                      <span className="min-w-5 h-5 px-1 flex items-center justify-center text-xs font-semibold -mt-3 text-white rounded-full">
                        {count}
                      </span>
                    )}
                    {/* Alerts Count */}
                    {item.label === "Alerts" &&
                      notification?.unreadCount > 0 && (
                        <span className="min-w-5 h-5 px-1 flex items-center justify-center text-xs font-semibold -mt-3 bg-gray-400 text-white rounded-full">
                          {notification?.unreadCount}
                        </span>
                      )}
                  </span>
                </Link>
              ))}

              <Link
                href="https://wa.me/+88018595439901"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-[#227C90] p-2 border-t border-b border-t-[#97d4e2] border-b-[#97d4e2]">
                  <Image
                    src={call}
                    alt="Zasulehry"
                    className="lg:w-8 lg:h-8 rotate-90"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/profile" className="hidden md:block">
            <div className="space-x-2 flex items-center">
              <CustomImage
                src={profileData?.data?.user?.image}
                title="Zasulehry"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full object-cover"
              />
              <p className="notranslate">
                {profileData?.data?.user?.name || "No Name"}
              </p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
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
                {/* {item.label === "Dashboard" || item.label === "Alerts" ? (
                  <span className="notranslate">{item.label}</span>
                ) : (
                  item.label
                )} */}
                <span className="flex items-center gap-2">
                  {item.label === "Dashboard" || item.label === "Alerts" ? (
                    <span className="notranslate">{item.label}</span>
                  ) : (
                    item.label
                  )}

                  {/* Inbox Count */}
                  {item.label === "Inbox" && count > 0 && (
                    <span className="min-w-5 h-5 px-1 flex items-center justify-center text-xs font-semibold -mt-3  rounded-full">
                      {count}
                    </span>
                  )}
                  {/* Alerts Count */}
                  {item.label === "Alerts" && notification?.unreadCount > 0 && (
                    <span className="min-w-5 h-5 px-1 flex items-center justify-center text-xs font-semibold -mt-3 bg-gray-400 text-white rounded-full">
                      {notification?.unreadCount}
                    </span>
                  )}
                </span>
              </Link>
            ))}

            <Link
              href="https://wa.me/+88018595439901"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rounded-full w-[10%] bg-[#227C90] p-2 border-t border-b border-t-[#97d4e2] border-b-[#97d4e2]">
                <Image
                  src={call}
                  alt="Zasulehry"
                  className="lg:w-8 lg:h-8 rotate-90"
                />
              </div>
            </Link>

            {/* CTA Button */}
            <Link
              href="/profile"
              className="block py-2 rounded-md hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <CustomImage
                  src={profileData?.user?.image}
                  // fallback={profile}
                  title="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover h-10"
                />
                <p className="text-gray-800 font-medium">
                  {profileData?.user?.name || "No Name"}
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
