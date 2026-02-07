import Invoice from "./Invoice";

export default function InvoicePayments({ data }: any) {
  return (
    <>
      <div className="flex gap-4">
        <button className={`flex-1 py-3 px-4 text-white rounded custom-btn`}>
          Invoice
        </button>
      </div>
      {<Invoice data={data} />}
      {/* {selectedTab === "card" && <PaymentSystem />} */}
    </>
  );
}
