"use client";

import { useRouter } from "next/navigation";
// import { useFormStatus } from "react-dom";

function FormButton({ type, destination, sending, onClick, children }) {
  const router = useRouter();
  // const { pending } = useFormStatus();

  const navigateTo = () => {
    if (destination === "back") router.back();
    else router.push(destination);
  };
  const base =
    "flex flex-row items-center justify-center capitalize py-2.5 px-4 md:py-3 md:px-6 text-[13px] font-bold text-blue-grey-200 md:text-sm rounded-card-corner hover:cursor-pointer transition-colors duration-300 ease-in-out disabled:pointer-events-none";
  const styles = {
    purple: base + " bg-purple hover:bg-purple-hover disabled:bg-purple-hover",
    blue: base + " bg-blue hover:bg-blue-hover disabled:bg-blue-hover",
    grey:
      base +
      " bg-blue-grey-700 hover:bg-blue-grey-600 disabled:bg-blue-grey-600",
    red: base + " bg-red hover:bg-red-200 disabled:bg-red-200",
  };

  if (destination)
    return (
      <button className={styles[type]} disabled={sending} onClick={navigateTo}>
        {children}
      </button>
    );
  else if (type === "red") {
    return (
      <button className={styles[type]} disabled={sending} onClick={onClick}>
        {children}
      </button>
    );
  } else
    return (
      <button className={styles[type]} disabled={sending}>
        {children}
      </button>
    );
}

export default FormButton;
