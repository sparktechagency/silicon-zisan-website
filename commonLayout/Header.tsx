import Link from "next/link";

export default function Header() {
  return (
    <header className="custom-bg flex justify-between items-center p-4">
      <div>
        {/* <Image src="/" alt="Logo" width={100} height={24} /> */}
        <h1>Logo Here</h1>
      </div>

      <nav>
        <ul className="flex gap-6 text-[22px]">
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/inbox">Inbox</Link>
          </li>
          <li>
            <Link href="/subscriptions">Subscription</Link>
          </li>
          <li>
            <Link href="/alerts">Alerts</Link>
          </li>
        </ul>
      </nav>

      <div className="flex gap-5">
        <button className="border border-[#A6DCE3] hover:bg-[#A6DCE3]/10 py-2 px-5 text-2xl text-white transition">
          Log In
        </button>
        <button className="border border-[#A6DCE3] hover:bg-[#A6DCE3]/10 py-2 px-5 text-2xl text-white transition">
          Sign Up
        </button>
      </div>
    </header>
  );
}
