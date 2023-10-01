
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/Navbar.js/NavBar";
import RTKWrapProvider from "@/RTK/provider";
import Footer from "@/components/Footer/Footer";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sachin Sangwan Doctor App",
  description: "Generated by create next app",
  icons: {
    icon: '/s logo.jpeg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="md:text-sm text-xs">
          <RTKWrapProvider>
           
              <NavBar />
              {children}
              <Footer/>
           
          </RTKWrapProvider>
        </div>
      </body>
    </html>
  );
}
