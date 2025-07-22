"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

function NavigationLink({ href, type, page, children }) {
  const linkColor = page === "roadmap" ? " text-white" : " text-blue-grey-500";
  const base =
    "flex flex-row font-bold items-center text-[13px] md:text-base gap-4 capitalize hover:underline hover:cursor-pointer transition duration-300 ease-in-out";
  const styles = {
    link: base + linkColor,
    button: base + " text-white",
  };

  const router = useRouter();

  const linkContent = (
    <>
      <Link href={href} className={styles[type]} onClick={() => router.back()}>
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 9L2 5l4-4"
            stroke={
              type === "button"
                ? "#cfd7ff"
                : page === "roadmap"
                ? "#FFFF"
                : "#4661E6"
            }
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <span>{children}</span>
      </Link>
    </>
  );

  if (type === "button") {
    return (
      <button className="py-4 px-10 rounded-card-corner bg-blue-grey-800">
        {linkContent}
      </button>
    );
  } else return linkContent;
}

export default NavigationLink;
