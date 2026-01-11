import InvoicePayments from "@/components/invoicePayments/InvoicePayments";
import { myFetch } from "@/utils/myFetch";

export default async function InvoicePaymentspage() {
  const res = await myFetch("/invoices/me");
  return (
    <>
      <InvoicePayments data={res?.data} />
    </>
  );
}
