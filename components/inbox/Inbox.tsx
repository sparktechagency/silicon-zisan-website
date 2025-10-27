import React from "react";
import AllUserChart from "./AllUserChart";
import MessageChart from "./MessageChart";

export default function Inbox() {
  return (
    <section className="grid grid-cols-[30%_auto] px-2 py-10">
      <div>
        <AllUserChart />
      </div>
      <div>
        <MessageChart />
      </div>
    </section>
  );
}
