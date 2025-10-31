import React from "react";
import AllUserChart from "./AllUserChart";
import MessageChart from "./MessageChart";

export default function Inbox() {
  return (
    <div className="2xl:max-w-[1400px] mx-auto w-full">
      <div className="grid grid-cols-1 xl:grid-cols-[35%_auto] px-2 py-10">
        <div className="w-[90%] xl:w-[78%] mx-auto">
          <AllUserChart />
        </div>
        <div className="w-[90%] xl:w-full mx-auto px-1">
          <MessageChart />
        </div>
      </div>
    </div>
  );
}
