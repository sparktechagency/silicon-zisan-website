import NewPassword from "@/components/authPage/NewPassword";
import BackButton from "@/share/BackButton";
import Container from "@/share/Container";
import Image from "next/image";

export default function page() {
  return (
    <Container className="flex flex-col md:flex-col lg:flex-row items-center justify-center h-auto lg:h-screen gap-10 py-10">
      {/* logo */}
      <div className="bg-[#374859] w-[200px] h-[200px] md:w-[300px] md:h-[300px] xl:w-[32%] xl:h-[400px] flex flex-col items-center justify-center rounded-full border border-[#FFFFFF0D]/90 p-5 relative ">
        {/* back button */}
        <BackButton />
        <Image
          src="/auth/logo.png"
          alt="Logo"
          width={150}
          height={24}
          className="w-24 md:w-40"
        />
        <h1 className="mt-2 md:mt-5 text-center text-white text-[9px] xl:text-[17px] capitalize">
          where dream job meets top talent
        </h1>
      </div>

      <div className="w-[80%] md:w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859]">
        <h1 className="text-center text-xl sm:text-3xl  font-semibold text-white pt-3 pb-10">
          Create New Password
        </h1>
        {/* form */}
        <NewPassword />
      </div>
    </Container>
  );
}
