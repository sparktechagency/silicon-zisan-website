import Status from "./Status";
import AppointmentCardsConfirmed from "./AppointmentCardsConfirmed";

// export const dynamic = "dynamic-force";

export default function Appointments({ res, chatId }: any) {
  // const params = useSearchParams();
  // const status = params.get("status");
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await myFetch(`/appointments/requests/me?status=${status}`);
  //     setData(res?.data);
  //   };
  //   fetchData();
  // }, [status]);

  return (
    <div className="md:w-[90%]">
      <Status />
      <AppointmentCardsConfirmed data={res} chatId={chatId} />
    </div>
  );
}
