import { Jost } from "next/font/google";
const jost = Jost({
  // variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

import "@/app/globals.css";

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: {
    template: "%s / Product Feedback App",
    default: "Dashboard / Product Feedback App",
  },
  description:
    "Our external product feedback application provides a user-friendly UI to add/edit users' requests and control product roadmap through voting option",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jost.className} flex flex-col bg-blue-grey-100`}>
        <main className="flex flex-col md:px-10 md:py-14 lg:flex-row lg:px-[165px] lg:pt-[80px] lg:pb-[120px] ">
          {children}
        </main>
      </body>
    </html>
  );
}
