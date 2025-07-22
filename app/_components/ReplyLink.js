"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ReplyLink({ commentId }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const replyTo = commentId;

  //   const currentReplyTo = searchParams.get("replyTo") ?? null;

  function handleReplyTo(replyTo) {
    const params = new URLSearchParams(searchParams);
    params.set("replyTo", replyTo);
    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <Button replyTo={replyTo} handleReplyTo={handleReplyTo}>
        Reply
      </Button>
    </>
  );
}

function Button({ replyTo, handleReplyTo, children }) {
  return (
    <button
      className="bg-none border-none outline-none font-semibold text-[13px] text-blue hover:underline hover:cursor-pointer"
      onClick={() => handleReplyTo(replyTo)}
    >
      {children}
    </button>
  );
}
