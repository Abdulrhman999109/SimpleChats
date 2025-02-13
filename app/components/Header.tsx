import Link from "next/link";

const Header = () => {
    return (
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/myLogo.png" alt="App Logo" className="w-12 h-12 rounded-full" />
            <h1 className="text-2xl font-bold text-yellow-50">QuickChats</h1>
          </div>
          <nav>
            <Link href="/" className="text-gray-300 hover:text-yellow-300">Home</Link>
            <Link href="/chat" className="ml-4 text-gray-300 hover:text-yellow-300">Chat</Link>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  