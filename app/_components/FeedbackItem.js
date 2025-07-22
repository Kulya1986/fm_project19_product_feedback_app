"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { addVote } from "@/app/_lib/actions";
import VoteButton from "./VoteButton";
import FilterButton from "./FilterButton";

function FeedbackItem({ feedback, voted, detailsPage }) {
  const { id, title, type, description, votes, comments, comments_count } =
    feedback;
  const router = useRouter();

  const navigateToDetails = () => {
    router.push(`/feedback/${id}`);
  };

  const voteData = {
    feedbackId: id,
    votes,
    userId: "b075af20-5627-44d0-b96c-3c20d842ed34",
  };

  const addVoteWithData = addVote.bind(null, voteData);

  return (
    <div
      className={`rounded-card-corner bg-white p-6 gap-4 md:gap-10 flex flex-col md:grid md:grid-cols-[40px_auto] md:items-start md:px-8 md:py-7 ${
        detailsPage ? " hover:cursor-default" : " hover:cursor-pointer"
      }`}
    >
      <div className="hidden md:block">
        <VoteButton isClicked={voted} voteClick={addVoteWithData}>
          <svg
            width="10"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
          >
            <path
              d="M1 6l4-4 4 4"
              stroke={voted ? "#fff" : "#4661E6"}
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          <span>{votes}</span>
        </VoteButton>
      </div>
      <div
        className="flex grow md:grid md:gap-10 md:grid-cols-[auto_40px] items-start"
        onClick={navigateToDetails}
      >
        <div>
          <h3 className="text-blue-grey-700">{title}</h3>
          <p className="mt-1 mb-2 text-[13px] md:mb-3 text-blue-grey-500 md:text-base">
            {description}
          </p>
          <FilterButton noHover={detailsPage ? false : true}>
            {type}
          </FilterButton>
        </div>
        <div className="hidden md:flex flex-row gap-2 self-center items-center justify-between">
          <Image
            src="/icons/icon-comments.svg"
            width={16}
            height={18}
            alt={`${
              comments_count || comments_count === 0
                ? comments_count
                : comments.length
            } comments`}
          />
          <p className="text-base font-bold tracking-[-0.22px] text-blue-grey-700">
            {comments_count || comments_count === 0
              ? comments_count
              : comments.length}
          </p>
        </div>
      </div>
      <div className="flex flex-row grow  justify-between md:hidden">
        <VoteButton
          page="roadmap"
          isClicked={voted}
          voteClick={addVoteWithData}
        >
          <svg
            width="10"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
            className="md:mt-1"
          >
            <path
              d="M1 6l4-4 4 4"
              stroke={voted ? "#fff" : "#4661E6"}
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          <span>{votes}</span>
        </VoteButton>
        <div className="flex flex-row gap-2 self-center items-center justify-between ">
          <Image
            src="/icons/icon-comments.svg"
            width={16}
            height={18}
            alt={`${
              comments_count || comments_count === 0
                ? comments_count
                : comments.length
            } comments`}
          />
          <p className=" text-[13px] tracking-[-0.18px] font-bold text-blue-grey-700">
            {comments_count || comments_count === 0
              ? comments_count
              : comments.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeedbackItem;
