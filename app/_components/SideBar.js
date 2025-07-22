"use client";
import { useMobileMenu } from "./MobileMenuContext";

function SideBar({ children }) {
  const { open } = useMobileMenu();

  return (
    <div>
      <div
        className={`${
          open
            ? "absolute w-full h-full top-[72px] left-0 bg-black opacity-50 z-5 "
            : " hidden "
        }`}
      ></div>
      <div
        className={`${
          open
            ? "flex flex-col fixed right-0 top-[72px] w-[271px] h-full z-10 transition-all duration-150 ease-in  p-6 gap-6 bg-blue-grey-100"
            : " hidden "
        } md:grid md:grid-cols-2 md:gap-2.5 lg:gap-6 lg:flex lg:flex-col`}
      >
        {children}
      </div>
    </div>
  );
}

export default SideBar;
