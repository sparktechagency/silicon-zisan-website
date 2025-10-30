import CustomBackButton from "@/share/CustomBackButton";

export default function InformationTwo({ data, data2 }: any) {
  return (
    <div className="bg-card text-white p-6 rounded-xl max-w-xl mx-auto space-y-6">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="py-2 flex items-center gap-2">
                <CustomBackButton />
                More Information
              </th>
              <th className="py-2">Month</th>
              <th className="py-2">Year</th>
            </tr>
          </thead>
          <tbody className="my-9">
            {data?.map((item: any, index: number) => (
              <tr
                key={index}
                className={`${item.isTotal ? "border-t border-white" : ""}`}
              >
                <td className="py-">{item.label}</td>
                <td className="py-">${item.month}</td>
                <td className="py-2">${item.year}</td>
              </tr>
            ))}
          </tbody>

          {/* <tbody className="mt-6">
            <h1 className="mt-7 text-2xl">Taxes</h1>
            {data2?.map((item: any, index: number) => (
              <tr
                key={index}
                className={`${item.isTotal ? "border-b border-white" : ""}`}
              >
                <td className="py-">{item.label}</td>
                <td className="py-">${item.month}</td>
                <td className="py-1">${item.year}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}
