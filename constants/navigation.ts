type NavItem = { label: string; href: string };
type SocialLink = { name: string; href: string; icon: string };
type FooterLink = { label: string; href: string };
type FooterSection = { title: string; links: FooterLink[] };

export const mainNavigation: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Inbox", href: "/inbox" },
  { label: "Subscription", href: "/subscriptions" },
  { label: "Alerts", href: "/alerts" },
];

export const socialLinks: SocialLink[] = [
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "WhatsApp", href: "https://whatsapp.com", icon: "whatsapp" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Profile", href: "/profile" },
      { label: "Home", href: "/" },
      { label: "Jobs", href: "/jobs" },
      { label: "For Employer", href: "/employer-services" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Jobs Posting", href: "/jobs-posting" },
      { label: "Subscription Plan", href: "/subscription-plan" },
      { label: "Salary Calculator", href: "/salary-calculator" },
      { label: "Download Center", href: "/download-center" },
    ],
  },
  {
    title: "Legal Info",
    links: [
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Impressum", href: "/impressum" },
      { label: "About Us", href: "/about-us" },
    ],
  },
];
