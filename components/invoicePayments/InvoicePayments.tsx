import Invoice from "./Invoice";

export default function InvoicePayments({ data }: any) {
  return (
    <>
      <div className="flex gap-4">
        <h1 className="text-2xl font-medium"> Invoice</h1>
      </div>
      {<Invoice data={data} />}
      {/* {selectedTab === "card" && <PaymentSystem />} */}
    </>
  );
}
