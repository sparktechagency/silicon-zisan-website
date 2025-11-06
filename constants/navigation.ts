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
  { name: "Youtube", href: "https://youtube.com", icon: "youtube" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Profile", href: "/profile" },
      { label: "Home", href: "/" },
      { label: "Job", href: "/?name=My+Posted+Jobs" },
      { label: "For Employer", href: "/?name=Hire+Employees" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Job Posting", href: "/?name=Post+Job" },
      { label: "Subscription Plan", href: "/?name=Subscription+Plan" },
      { label: "Salary Calculator", href: "/?name=Salary+Calculator" },
      { label: "Download Center", href: "/?name=Download+Center" },
    ],
  },
  {
    title: "Legal Info",
    links: [
      { label: "Terms & Conditions", href: "/terms-condition" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Impressum", href: "/impressum" },
      { label: "About Us", href: "#" },
    ],
  },
];
