"use client";
import Image from "next/image";
import { useMobileMenu } from "./MobileMenuContext";
import { useEffect } from "react";

function MobileMenuToggle() {
  const { open, setOpen } = useMobileMenu();

  useEffect(
    function () {
      if (open) {
        document.body.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
      }
    },
    [open]
  );

  useEffect(function () {
    setOpen(false);
  }, []);

  return (
    <div
      className="w-[20px] h-[17px] md:hidden"
      onClick={() => setOpen((curr) => !curr)}
    >
      <Image
        src={open ? "/icons/icon-close.svg" : "/icons/icon-hamburger.svg"}
        alt="Open mobile menu"
        width={20}
        height={17}
      />
    </div>
  );
}

export default MobileMenuToggle;
