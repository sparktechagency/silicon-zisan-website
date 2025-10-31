import React from "react";
import AllUserChart from "./AllUserChart";
import MessageChart from "./MessageChart";

export default function Inbox() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-[30%_auto] px-2 py-10">
      <div className="w-[90%] xl:w-[78%] mx-auto">
        <AllUserChart />
      </div>
      <div className="w-[90%] xl:w-full mx-auto px-1">
        <MessageChart />
      </div>
    </section>
  );
}
