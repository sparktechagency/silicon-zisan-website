import Container from "@/share/Container";
import Image from "next/image";
import LoginPage from "@/components/authPage/Login";
import BackButton from "@/share/BackButton";
import logo from "@/public/auth/logo.png";

export default function page() {
  return (
    <Container className="flex flex-col lg:flex-row items-center justify-center h-auto lg:h-screen gap-10 px-4 py-16 lg:py-10">
      {/* logo */}
      <div className="bg-[#374859] w-[200px] h-[200px] md:w-[300px] md:h-[300px] xl:w-[400px] xl:h-[400px] flex flex-col items-center justify-center rounded-full border border-[#FFFFFF0D]/50 p-5 relative shrink-0">
        {/* back button */}
        <div className="absolute top-0 md:top-5 left-0 md:left-5">
          <BackButton />
        </div>
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={24}
          className="w-24 md:w-32 xl:w-40"
          priority
        />
        <h1 className="mt-2 md:mt-5 text-center text-white text-[9px] md:text-[12px] xl:text-[16px] font-medium capitalize">
          where dream job meets top talent
        </h1>
      </div>

      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[35%] border border-[#FFFFFF0D] p-6 md:p-8 rounded-xl bg-[#374859] shadow-xl">
        <h1 className="text-center text-2xl md:text-3xl font-semibold text-white pt-3 pb-8 md:pb-10">
          Log In (Employer)
        </h1>
        {/* form component here */}
        <LoginPage />
      </div>
    </Container>
  );
}
