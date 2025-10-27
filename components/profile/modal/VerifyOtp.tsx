// // components/CountryModal.tsx
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export function VerifyOtp({ trigger }: { trigger: React.ReactNode }) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>{trigger}</DialogTrigger>
//       <DialogContent className="max-w-sm bg-[#3C4751] rounded-lg p-6 w-full  shadow-lg opacity-80 border border-gray-400/30 z-50">
//         <DialogHeader>
//           <DialogTitle className="text-center">
//             Verify OTP
//             <p className="capitalize text-sm">
//               we have sent the OTP to your phone number
//             </p>
//           </DialogTitle>
//         </DialogHeader>

//         <Input placeholder="Enter your number" />

//         <DialogFooter className="pt-4">
//           <Button className="w-full custom-btn">Continue</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyOtpModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm bg-[#3C4751] rounded-lg p-6 w-full shadow-lg opacity-80 border border-gray-400/30 z-50">
        <DialogHeader>
          <DialogTitle>Verify OTP</DialogTitle>
        </DialogHeader>

        <Input placeholder="Enter OTP" className="mt-2 mb-4" />

        <DialogFooter>
          <Button
            type="button"
            className="w-full custom-btn"
            onClick={() => setOpen(false)}
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
