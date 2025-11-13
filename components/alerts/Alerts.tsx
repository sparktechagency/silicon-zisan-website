import Container from "@/share/Container";
import { ArrowDown, Bell, Settings } from "lucide-react";

export default function Alerts() {
  return (
    <Container className="my-16">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">All Alerts</h1>
        {/* <Link href="/alert-setting">
          <button className="flex items-center gap-3 custom-btn rounded px-5 py-3 ">
            <Settings
              size={22}
              className="button-active w-8 h-8 rounded-full p-1"
            />
            Settings
          </button>
        </Link> */}
      </div>
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="mb-4">
          {/* Transaction Info */}
          <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
            <div>
              <p className="text-lg flex gap-3 items-center font">
                <Bell /> kamran is ux ui designer
              </p>
            </div>

            <div className="flex space-x-2">
              <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer">
                12 : 00 Pm
              </button>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}
