import { Button } from "../ui/button";
import WhatsAppModal from "./WhatsAppModal";
import { Pencil, Trash } from "lucide-react";
import DeleteButton from "../appointments/DeleteButton";

export default function AddWhatsLink() {
  return (
    <div>
      <div className="flex justify-end">
        <WhatsAppModal
          title="Add Whatsapp Link"
          trigger={
            <Button className="custom-btn h-12 text-xl">
              Add WhatsApp Link
            </Button>
          }
        />
      </div>

      {/* data show here */}
      <div className="bg-card border border-gray-400/30 p-4 rounded mt-5 flex justify-between">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium.
        </p>
        <div className="flex gap-3 cursor-pointer">
          <WhatsAppModal trigger={<Pencil />} />
          <DeleteButton
            title="Delete Link"
            trigger={<Trash className="text-red-500" />}
          />
        </div>
      </div>
    </div>
  );
}
