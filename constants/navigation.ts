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
      { label: "Homepage", href: "/" },
      { label: "Jobs", href: "/my-jobs" },
      { label: "For Employer", href: "/" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Job Posting", href: "/post-job" },
      { label: "Subscriptions", href: "/subscriptions" },
      // { label: "Salary Calculator", href: "/?name=Salary+Calculator" },
      { label: "Download Center", href: "/download-center" },
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
