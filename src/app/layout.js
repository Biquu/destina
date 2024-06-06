import { Inter } from "next/font/google";
import "./globals.css";
import  GlobalState  from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Destina",
  description: "Destina is a platform for playing games online with friends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState> 
          {children}
        </GlobalState>
      </body>
    </html>
  );
}
