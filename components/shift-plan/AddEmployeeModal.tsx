import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormInput } from "lucide-react";

export default function AddEmployeeForm({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee Data:", formData);
    // Add your save logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-xl max-w-sm bg-[#3C4751] backdrop-blur-sm opacity-90 border border-gray-400/30 shadow-lg">
        <form onSubmit={handleSubmit} className=" text-white  space-y-5">
          <h2 className="text-xl font-semibold ">Add Employee</h2>

          {/* Employee Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Employee Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full p-2 rounded  text-white placeholder:text-[13px]"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full p-2 rounded  text-white placeholder:text-[13px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Contact Number */}
            <div>
              <label className="block mb-1 font-medium">Contact Number</label>
              <Input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full p-2 rounded  text-white placeholder:text-[13px]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full p-2 rounded  text-white placeholder:text-[13px]"
              />
            </div>
          </div>
          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" className="w-[50%] custom-btn">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
