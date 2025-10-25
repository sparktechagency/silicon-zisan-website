import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function FeedBackModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="cursor-pointer border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-[#0F172A] transition">
          Feedback
        </button>
      </DialogTrigger>
      <DialogContent className=" text-white bg-[#3C4751] rounded-lg p-6 w-full max-w-md shadow-lg opacity-80">
        <div>
          <h1 className="text-white text-xl">Give Your FeedBack</h1>
          <form>
            <Textarea
              className="my-5 h-40 placeholder:text-white"
              placeholder="Type Your Review"
            />
            <Button className="custom-btn w-full">Submit</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// import { useState } from "react";
// import { FaStar } from "react-icons/fa";

// export default function FeedbackForm() {
//   const [rating, setRating] = useState(2);
//   const [hover, setHover] = useState(null);
//   const [review, setReview] = useState("");

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
//       <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4 text-center">
//           Give Your Feedback
//         </h2>

//         {/* Star Rating */}
//         <div className="flex justify-center mb-6">
//           {[...Array(5)].map((_, i) => {
//             const starValue = i + 1;
//             return (
//               <label key={starValue}>
//                 <input
//                   type="radio"
//                   name="rating"
//                   value={starValue}
//                   className="hidden"
//                   onClick={() => setRating(starValue)}
//                 />
//                 <FaStar
//                   size={30}
//                   className="cursor-pointer transition-colors"
//                   color={starValue <= (hover || rating) ? "#facc15" : "#4b5563"}
//                   onMouseEnter={() => setHover(starValue)}
//                   onMouseLeave={() => setHover(null)}
//                 />
//               </label>
//             );
//           })}
//         </div>

//         {/* Review Textarea */}
//         <div className="mb-6">
//           <label htmlFor="review" className="block mb-2 text-sm font-medium">
//             Review
//           </label>
//           <textarea
//             id="review"
//             placeholder="Type Your Review"
//             className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-md transition-colors"
//           onClick={() => {
//             console.log("Rating:", rating);
//             console.log("Review:", review);
//           }}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
