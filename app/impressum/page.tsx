import Container from "@/share/Container";
export const sections = [
  {
    title: "1. Introduction",
    content: [
      `Welcome to Service Ware! This Privacy Policy explains how we collect,
        use, disclose, and protect your information when you use the Service
        Ware mobile application ("App"). By using the App, you agree to the
        collection and use of your data in accordance with this policy.`,
    ],
  },
  {
    title: "2. Information We Collect",
    subsections: [
      {
        subtitle: "A. Personal Information",
        text: `When you register or use the App, we may collect personal details such as your name, email address, phone number, and payment information.`,
      },
      {
        subtitle: "B. Usage Data",
        text: `We may also collect data about how you interact with the App, including pages visited, time spent, and service requests.`,
      },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <div className="flex items-center justify-center bg-linear-to-br from-[#0f4c5c] to-[#2c7a7b] py-10">
        <h1 className="text-white text-4xl font-semibold">Impressum</h1>
      </div>

      <Container>
        <div className="bg-[#2D3E4F] text-white p-6 md:p-10 space-y-8 font-sans">
          {sections?.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>

              {/* Regular content */}
              {section.content?.map((paragraph, j) => (
                <p key={j} className="leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}

              {/* Subsections */}
              {section.subsections?.map((sub, k) => (
                <div key={k} className={`space-y-2 ${k > 0 ? "mt-6" : ""}`}>
                  <h3 className="text-lg font-semibold">{sub.subtitle}</h3>
                  <p className="leading-relaxed">{sub.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
