import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold flex items-center">
          <img src="/myLogo.png" alt="Logo" className="mr-2 w-8 h-8" />
          QuickChats
        </h1>
        <nav>
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/chat">Chat</Link>
        </nav>
      </div>
    </header>
  );
}
