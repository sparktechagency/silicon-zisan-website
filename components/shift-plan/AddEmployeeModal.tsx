import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormInput } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export default function AddEmployeeForm({
  trigger,
  title,
}: {
  trigger: React.ReactNode;
  title?: string;
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

    // Add your save logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-xl max-w-sm bg-[#3C4751] backdrop-blur-sm opacity-90 border border-gray-400/30 shadow-lg">
        <DialogTitle className="text-xl font-semibold ">
          {title ? "Edit Employee" : "Add Employee"}
        </DialogTitle>

        <form onSubmit={handleSubmit} className=" text-white  space-y-5">
          {/* Employee Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1 font-medium">Employee Name</Label>
              {title ? (
                <Select>
                  <SelectTrigger className="w-full border">
                    <SelectValue placeholder="Select Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Michael Lee">Michael Lee</SelectItem>
                      <SelectItem value="Sara Khan">Sara Khan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full p- rounded  text-white placeholder:text-[13px]"
                />
              )}
            </div>

            {/* Email Address */}
            <div>
              <Label className="block mb-1 font-medium">Email Address</Label>
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
              <Label className="block mb-1 font-medium">Contact Number</Label>
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
              <Label className="block mb-1 font-medium">Address</Label>
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
            <DialogClose asChild>
              <Button type="submit" className="w-[50%] custom-btn">
                Save
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
