import Container from "@/share/Container";
import Image from "next/image";
import BackButton from "@/share/BackButton";
import SelectMethod from "@/components/authPage/SelectMethod";

export default function page() {
  return (
    <Container className="flex flex-col md:flex-col lg:flex-row items-center justify-center h-auto lg:h-screen gap-10 py-10">
      <div className="bg-[#374859] w-[200px] h-[200px] md:w-[300px] md:h-[300px] xl:w-[400px] xl:h-[400px] flex flex-col items-center justify-center rounded-full border border-[#FFFFFF0D]/50 p-5 relative">
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
      {/* select component */}
      <SelectMethod />
    </Container>
  );
}
