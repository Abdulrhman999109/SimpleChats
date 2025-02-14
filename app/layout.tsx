import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>QuickChats</title>
        <meta name="description" content="A real-time chat application" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <link rel="icon" href="/myLogo.png" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-900 text-gray-50">
        <Header />
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
